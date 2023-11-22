import React from "react";
import style from "./like.module.css";
import { IoIosLogOut } from "react-icons/io";
import { RiGoogleFill } from "react-icons/ri";
import { getUserLikeVideosAsync, selectLikedVideos } from "../Video/videoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { selectUserInfo } from "../../Auth/authSlice";
const LikedVideos = () => {
  const dispatch = useDispatch();
  const user  = useSelector(selectUserInfo);

  const LikedVideos = useSelector(selectLikedVideos);
  console.log(LikedVideos);
  useEffect(() => {
    dispatch(getUserLikeVideosAsync(user._id));
  }, [dispatch]);

  return (
    <>
      {LikedVideos.length !== 0 ? (
        <div className={style.container}>
          <div className={style.LeftSide}>
            <img
              src={`http://localhost:8000/` + LikedVideos[0]?.thumbnail}
              alt="error"
            />
            <h4>Liked Videos</h4>
            <h6>{user?.username}</h6>
            <span>{LikedVideos?.length} Videos </span>
            <div className={style.btn}>
              <Link className={style.btn1} to={`/video/${LikedVideos[0]?._id}`}>
                <IoIosLogOut className={style.btnIcon} /> Play video
              </Link>
              <button className={style.btn2}>
                <RiGoogleFill className={style.btnIcon} />
                Shuffle{" "}
              </button>
            </div>
          </div>
          <div className={style.rightSide}>
            {LikedVideos.map((e) => {
              return (
                <Link
                  className={style.video}
                  key={e._id}
                  to={`/video/${e._id}`}
                >
                  {" "}
                  {/* <p>1</p> */}
                  <img
                    src={`http://localhost:8000/` + e?.thumbnail}
                    alt="error"
                  />
                  <div className={style.content}>
                    <h6>{e.title}</h6>
                    <span>
                      <span className={style.name}>{e.name} </span>
                      <span>
                        {" "}
                        * 40 views * {new Date(e.createdAt).toLocaleString()}
                      </span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <h3 className="mx-auto mt-5 pt-5">No liked videos found</h3>
      )}
    </>
  );
};

export default LikedVideos;
