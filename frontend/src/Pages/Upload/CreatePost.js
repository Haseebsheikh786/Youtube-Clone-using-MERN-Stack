import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Style from "./style.module.css";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../Auth/authSlice";

const SignUp = () => {
  const user  = useSelector(selectUserInfo);
  const navigate = useNavigate();
  // const alert = useAlert();
  const [pic, setPic] = useState();
  const [description, setdescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("pic", pic);
    formdata.append("description", description);
    formdata.append("userId", user._id);

    try {
      await axios.post("http://localhost:8000/createPost", formdata);
      alert("post successfully created");
      navigate("/");
    } catch (e) {
      alert(e.response.data.error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={Style.wrapper}>
          <div className={Style.header}>Create a new Post</div>
          <div className={Style.commonDiv}>
            <div>
              <label>Enter a Description :</label>
            </div>
            <textarea
              className={Style.content}
              placeholder="your description goes here..."
              maxLength={400}
              onChange={(e) => setdescription(e.target.value)}
            />
          </div>

          <div className={Style.commonDiv}>
            <div>
              <label>Choose a Thumbnail :</label>
            </div>
            <input
              type="file"
              className={Style.url}
              aria-label="Username"
              id="photo"
              required
              onChange={(e) => setPic(e.target.files[0])}
            />
          </div>
          <div>
            <button
              type="submit"
              className={Style.submit}
              disabled={description === "" || pic === ""}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUp;
