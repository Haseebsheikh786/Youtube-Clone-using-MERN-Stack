import style from "./videoDetail.module.css";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVideosAsync,
  getVideoByIDAsync,
  selectAllVideos,
  selectVideobyId,
} from "../Home/Video/videoSlice";
import { axiosInstance } from "../Auth/authApi";
import VideoDetailList from "./videoDetailList";
import { selectUserInfo } from "../Auth/authSlice";

const VideoDetail = ({ addRemFriend, setAddRemFriend }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);

  const video = useSelector(selectVideobyId);
  const videos = useSelector(selectAllVideos);

  const [Likevideo, setLikeVideo] = useState();
  const [comments, setComments] = useState([]);
  const [Postcomment, setPostComment] = useState("");
  const PostComment = async () => {
    const response = await axiosInstance.post(`/comment/`, {
      userId: user._id,
      description: Postcomment,
      postId: params.id,
    });
    setPostComment(response.data);
    document.getElementById("textBox").value = "";
    setPostComment("");
  };

  useEffect(() => {
    const fetchAllComments = async () => {
      const res = await axiosInstance.get(`/comment/${params.id}`);
      setComments(res.data);
    };
    fetchAllComments();
  }, [Postcomment, params.id]);

  const currentVideo = videos.filter((video) => video._id !== params.id);

  const LikeVideo = async (id) => {
    const response = await axiosInstance.patch(`/video/${id}/${user._id}`);
    setLikeVideo(response.data);
  };

  useEffect(() => {
    dispatch(getAllVideosAsync());
  }, [dispatch]);

  useEffect(() => {
    if (params.id) {
      dispatch(getVideoByIDAsync(params.id));
      // window.location.reload();
    }
  }, [dispatch, params.id, Likevideo, comments]);

  return (
    <>
      {video?._id && (
        <div className={style.container}>
          <div className={style.LeftSide}>
            <VideoDetailList
              videoId={video?._id}
              videoUserId={video?.userId}
              Description={video?.description}
              title={video.title}
              video={video.video}
              likes={video.likes}
              LikeVideo={LikeVideo}
              createdAt={video.createdAt}
              comments={comments}
              setPostComment={setPostComment}
              PostComment={PostComment}
              setAddRemFriend={setAddRemFriend}
              addRemFriend={addRemFriend}
            />
          </div>
          <div className={style.rightSide}>
            {currentVideo.map((e) => {
              return (
                <Link
                  className={style.video}
                  key={e._id}
                  to={`/video/${e._id}`}
                >
                  {/* <p>{e._id}</p> */}
                  <img
                    src={`http://localhost:8000/` + e.thumbnail}
                    alt="error"
                  />
                  <div className={style.content}>
                    <h6>{e.title}</h6>
                    <span>
                      <span className={style.name}>{e.name}</span>
                      <span className={style.textLight}>
                        {" "}
                        40 views * {new Date(e.createdAt).toLocaleString()}
                      </span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default VideoDetail;
