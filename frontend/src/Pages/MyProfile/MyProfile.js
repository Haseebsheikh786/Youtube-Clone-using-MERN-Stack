import React, { useEffect } from "react";
import style from "./style.module.css";
import VideoStyling from "../../Component/Video/Video.module.css";
import { IoIosLogOut } from "react-icons/io";
import { RiGoogleFill } from "react-icons/ri";
import Video from "../../Component/Video/Video";
import { useDispatch, useSelector } from "react-redux";
import { Logout, selectUserInfo } from "../Auth/authSlice";
import {
  getVideosByUserIdAsync,
  selectUserVideos,
} from "../Home/Video/videoSlice";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const dispatch = useDispatch();

  const user  = useSelector(selectUserInfo);
  const videos = useSelector(selectUserVideos);

  useEffect(() => {
    dispatch(getVideosByUserIdAsync(user._id));
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(Logout());
  };
  return (
    <>
      <div className={style.Profilecontainer}>
        <div className={style.icon}>
          <img
            src={`http://localhost:8000/` + user?.photo}
            alt="error"
            className={style.imageIcon}
          />
        </div>
        <div className={style.content}>
          <h1>{user?.username}</h1>
          <span className={style.ViewChannel}>{user?.email}</span>
          <span className={style.ViewChannel}>
            {user?.subscribers?.length} subscriber
          </span>
          <div className={style.btn}>
            <button onClick={handleLogout}>
              <IoIosLogOut className={style.btnIcon} /> Sign Out
            </button>
            <button disabled>
              <RiGoogleFill className={style.btnIcon} />
              Google Account
            </button>
          </div>
        </div>
      </div>
      <h2>My videos</h2>
      <div className={VideoStyling.container}>
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
                <Link
                  className={VideoStyling.video}
                  key={_id}
                  to={`/video/${_id}`}
                >
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
          )}{" "}
      </div>
    </>
  );
};

export default MyProfile;
