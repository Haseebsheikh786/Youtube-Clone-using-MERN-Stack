import React, { useEffect } from "react";
import Video from "../../../Component/Video/Video";
import style from "../../../Component/Video/Video.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideosAsync, selectAllVideos } from "./videoSlice";
import { Link } from "react-router-dom";
const Videos = () => {
  const dispatch = useDispatch();

  const videos = useSelector(selectAllVideos);

  useEffect(() => {
    dispatch(getAllVideosAsync());
  }, [dispatch]);

  return (
    <div className={style.container}>
      {videos &&
        videos.map(
          ({
            _id,
            userId,
            name,
            userPicturePath,
            description,
            video,
            thumbnail,
            title,
            createdAt,
          }) => {
            return (
              <Link className={style.video} key={_id} to={`/video/${_id}`}>
                <Video
                  key={_id}
                  videoId={_id}
                  videoUserId={userId}
                  name={name}
                  userPicturePath={userPicturePath}
                  Description={description}
                  thumbnail={thumbnail}
                  title={title}
                  video={video}
                  createdAt={createdAt}
                />
              </Link>
            );
          }
        )}
    </div>
  );
};

export default Videos;
