import React, { useState } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectUserInfo } from "../Auth/authSlice";
const UploadVideo = () => {
  const user = useSelector(selectUserInfo);
  const navigate = useNavigate();
  const [pic, setPic] = useState();
  const [video, setVideo] = useState();
  const [description, setdescription] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("pic", pic);
    formdata.append("video", video);
    formdata.append("description", description);
    formdata.append("title", title);
    formdata.append("userId", user._id);

    try {
      await axios.post("http://localhost:8000/uploadVideo", formdata);
      alert("video successfully uploaded");
      navigate("/");
    } catch (e) {
      alert(e.response.data.error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {" "}
        <div className={styles.wrapper}>
          <div className={styles.header}>Upload your new Video</div>
          <div className={styles.commonDiv}>
            <div>
              <label>Enter a Title :</label>
            </div>
            <input
              type="text"
              name="title"
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.commonDiv}>
            <div>
              <label>Enter a Description :</label>
            </div>
            <textarea
              className={styles.content}
              placeholder="your description goes here..."
              maxLength={400}
              onChange={(e) => setdescription(e.target.value)}
            />
          </div>
          <div className={styles.commonDiv}>
            <div>
              <label>Choose a Thumbnail :</label>
            </div>
            <input
              type="file"
              className={styles.url}
              aria-label="Username"
              id="photo"
              name="thumbnail"
              required
              onChange={(e) => setPic(e.target.files[0])}
            />
          </div>
          <div className={styles.commonDiv}>
            <div>
              <label>Choose a Video :</label>
            </div>
            <input
              type="file"
              className={styles.url}
              aria-label="Username"
              id="photo"
              name="video"
              required
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
          <div>
            <button
              type="submit"
              className={styles.submit}
              // disabled={
              //   title === "" || description === "" || pic === "" || video === ""
              // }
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UploadVideo;
