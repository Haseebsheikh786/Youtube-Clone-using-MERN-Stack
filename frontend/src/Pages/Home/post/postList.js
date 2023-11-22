import style from "./post.module.css";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { BiCommentMinus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPostsAsync, selectAllPosts } from "./postSlice";
import { useEffect } from "react";
import React from "react";
import { useState } from "react";
import { axiosInstance } from "../../Auth/authApi";
import { selectUserInfo } from "../../Auth/authSlice";

const PostList = ({
  postId,
  postUserId,
  name,
  Description,
  picturePath,
  userPicturePath,
  createdAt,
  likes,
  setLikePost,
}) => {
  const user  = useSelector(selectUserInfo);

  const isLiked = Boolean(likes[user?._id]);
  const likeCount = Object.keys(likes).length;

  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [Postcomment, setPostComment] = useState("");
  const handleshowComment = async () => {
    setShowComment(!showComment);
  };

  const LikePost = async (id) => {
    const response = await axiosInstance.patch(`/post/${id}/${user._id}`, {
      userId: user._id,
    });
    setLikePost(response.data);
  };

  const PostComment = async () => {
    const response = await axiosInstance.post(`/comment/`, {
      userId: user._id,
      description: Postcomment,
      postId: postId,
    });
    setPostComment(response.data);
    document.getElementById("textBox").value = "";
    setPostComment("");
  };

  useEffect(() => {
    const fetchAllComments = async () => {
      const res = await axiosInstance.get(`/comment/${postId}`);
      setComments(res.data);
      console.log(res.data);
    };
    fetchAllComments();
  }, [Postcomment]);
  return (
    <>
      <div className={style.icon}>
        <img
          src={`http://localhost:8000/` + userPicturePath}
          alt="error"
          className={style.imageIcon}
        />
      </div>
      <div className={style.content}>
        <h5>
          {name}
          <span className={style.time}>
            {" "}
            {new Date(createdAt).toLocaleString()}
          </span>{" "}
        </h5>
        <p>{Description}</p>
      </div>
      <img
        src={`http://localhost:8000/` + picturePath}
        alt="error"
        className={style.image}
      />
      <div className="mt-2 mb-3 mx-3 d-flex">
        {!isLiked ? (
          <div>
            <AiOutlineHeart
              className=" mx-1"
              id={style.LikeComment}
              onClick={() => LikePost(postId)}
            />
            <span>{likeCount}</span>
          </div>
        ) : (
          <div>
            <AiTwotoneHeart
              className=" mx-1 text-danger"
              id={style.LikeComment}
              onClick={() => LikePost(postId)}
            />
            <span>{likeCount}</span>
          </div>
        )}
        <div className="mx-3">
          <BiCommentMinus
            className="mx-1"
            id={style.LikeComment}
            onClick={handleshowComment}
          />
          <span>{comments.length}</span>
        </div>
      </div>
      {showComment && (
        <>
          <ol class="list-group-item  bg-black">
            {comments.map((e) => {
              return (
                <li
                  class="list-group-item d-flex justify-content-between align-items-start my-2"
                  key={e._id}
                >
                  <div class="ms-2 me-auto text-white">
                    <div class="fw-bold text-white">
                      {e.name}
                      <span className={style.textLight2}>
                        {" "}
                        {new Date(e.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <span className="fw-100"> {e.description}</span>
                  </div>
                </li>
              );
            })}
          </ol>
          <div class="input-group input-group-lg d-flex">
            <input
              autoFocus
              id="textBox"
              type="text"
              class="form-control mx-2"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
              onChange={(e) => setPostComment(e.target.value)}
            />
            <div className="mt-4 mx-1 ">
              <button className="btn btn-primary" onClick={PostComment}>
                Post
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PostList;
