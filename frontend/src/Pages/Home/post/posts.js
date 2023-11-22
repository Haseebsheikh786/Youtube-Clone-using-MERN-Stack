import style from "./post.module.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPostsAsync, selectAllPosts } from "./postSlice";
import { useEffect } from "react";
import PostList from "./postList";
const Posts = () => {
  const dispatch = useDispatch();
  const [likePost, setLikePost] = useState();

  const posts = useSelector(selectAllPosts);

  console.log(posts);

  useEffect(() => {
    dispatch(fetchAllPostsAsync());
  }, [dispatch, likePost]);

  return (
    <>
      <div className={style.container}>
        {posts &&
          posts.map(
            ({
              _id,
              userId,
              name,
              description,
              picturePath,
              userPicturePath,
              likes,
              createdAt,
            }) => {
              return (
                <div className={style.video} key={_id}>
                  <PostList
                    key={_id}
                    postId={_id}
                    postUserId={userId}
                    name={name}
                    Description={description}
                    picturePath={picturePath}
                    userPicturePath={userPicturePath}
                    likes={likes}
                    setLikePost={setLikePost}
                    createdAt={createdAt}
                  />
                </div>
              );
            }
          )}
      </div>
    </>
  );
};

export default Posts;
