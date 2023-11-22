import React from "react";
import style from "./Video.module.css";
const Video = ({
  videoId,
  videoUserId,
  name,
  userPicturePath,
  Description,
  thumbnail,
  title,
  video,
  createdAt,
}) => {
  return (
    <>
      <img
        src={`http://localhost:8000/` + thumbnail}
        alt="error"
        className={style.image}
      />
      <div className={style.icon}>
        <img
          src={`http://localhost:8000/` + userPicturePath}
          alt="error"
          className={style.imageIcon}
        />
      </div>
      <div className={style.content}>
        <h5>{title}</h5>
        <p className="pt-2">{name}</p>
        <p className={style.date}>
          10 likes . {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </>
  );
};

export default Video;
