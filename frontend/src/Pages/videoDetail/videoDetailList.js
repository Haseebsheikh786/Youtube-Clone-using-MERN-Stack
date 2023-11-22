import style from "./videoDetail.module.css";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { BiCommentMinus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserByIDAsync,
  getUserSubscribersAsync,
  selectUserByID,
  selectUserInfo,
  selectUserSubscribers,
} from "../Auth/authSlice";
import { axiosInstance } from "../Auth/authApi";

const paraStyle = {
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  display: "-webkit-box",
};
const paraStyl2 = {
  paddingRight: "1rem",
};
const VideoDetailList = ({
  videoId,
  videoUserId,
  Description,
  title,
  video,
  likes,
  createdAt,
  LikeVideo,
  comments,
  setPostComment,
  PostComment,
  addRemFriend,
  setAddRemFriend,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);

  const ref = useRef(null);
  const [isOpen, setisOpen] = useState(false);
  const [ShowReadBtn, setShowReadBtn] = useState(false);

  const selectUser = useSelector(selectUserByID);
  const selectUserSubscriber = useSelector(selectUserSubscribers);

  const isFriend = selectUserSubscriber?.find(
    (friend) => friend._id === user._id
  );

  const isLiked = Boolean(likes[user?._id]);
  const likeCount = Object?.keys(likes).length;

  const subcribeUser = async (id) => {
    const response = await axiosInstance.patch(`/${user._id}/${id}`);
    setAddRemFriend(response.data);
  };

  useEffect(() => {
    if (ref.current) {
      setShowReadBtn(ref.current.scrollHeight !== ref.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    dispatch(getUserByIDAsync({ id: videoUserId }));
  }, [dispatch, , addRemFriend, videoId]);

  useEffect(() => {
    dispatch(getUserSubscribersAsync({ id: videoUserId }));
  }, [dispatch, , addRemFriend]);

  return (
    <>
      <video controls className={style.reactplayer}>
        <source src={`http://localhost:8000/` + video} key={video} />
        Your browser does not support the video tag.
      </video>
      <h5 className="mx-2">{title}</h5>{" "}
      <div className="d-flex mb-1">
        <div className={style.icon}>
          <img
            src={`http://localhost:8000/` + selectUser?.photo}
            alt="error"
            className={style.imageIcon}
          />
        </div>
        <div>
          <h6>{selectUser?.username}</h6>
          <span className={style.textLight}>
            {selectUser?.subscribers?.length} subscribers
          </span>
        </div>

        <div className={style.subcribeBTN}>
          {isFriend ? (
            <button
              className="btn btn-danger"
              onClick={() => subcribeUser(selectUser?._id)}
            >
              unSubscribe
            </button>
          ) : (
            <button
              className="btn btn-light"
              onClick={() => subcribeUser(selectUser?._id)}
            >
              subscribe
            </button>
          )}
        </div>
      </div>
      <span className={style.textLight}>
        10k views ` {new Date(createdAt).toLocaleString()}
      </span>
      <div className="py-1">
        <span style={isOpen ? paraStyl2 : paraStyle} ref={ref}>
          {Description}
        </span>
        {ShowReadBtn && (
          <span
            onClick={() => setisOpen(!isOpen)}
            className={style.readMorebtn}
          >
            {isOpen ? "show less" : " read more"}
          </span>
        )}
      </div>
      <div className="mt-2  d-flex" onClick={() => LikeVideo(videoId)}>
        {isLiked ? (
          <AiTwotoneHeart className="mx-1 text-danger" id={style.LikeComment} />
        ) : (
          <AiOutlineHeart className="mx-1" id={style.LikeComment} />
        )}
        <p className="number">{likeCount}</p>

        <div className="mx-3">
          <BiCommentMinus className="mx-1" id={style.LikeComment} />
          <span className="number ">{comments.length}</span>
        </div>
      </div>
      {
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
                        {new Date(e.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <span className="fw-100">{e.description}</span>
                  </div>
                </li>
              );
            })}
          </ol>
          <div class="input-group input-group-lg d-flex">
            <input
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
      }
    </>
  );
};

export default VideoDetailList;
