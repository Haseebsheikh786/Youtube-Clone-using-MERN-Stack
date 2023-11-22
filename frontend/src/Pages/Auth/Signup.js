import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Style from "./style.module.css";

const SignUp = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const [pic, setPic] = useState();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("pic", pic);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("username", username);
    try {
      await axios.post("http://localhost:8000/signup", formdata);
      alert.success("Kindly Verify your email address");
      navigate("/verify-email");
    } catch (e) {
      alert.error(e.response.data.error);
    }
  };
  return (
    <>
      <div className={Style.wrapper}>
        <form onSubmit={handleSubmit}>
          <h3 className="text-center my-3">Create your account</h3>
          <div class="input-group">
            <input
              type="text"
              class="form-control mb-3 mx-2"
              placeholder="Enter your name"
              aria-label="Username"
              id="username"
              required
              minLength={5}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div class="input-group ">
            <input
              type="email"
              class="form-control mb-3 mx-2"
              placeholder="Enter valid email"
              aria-label="Username"
              id="email"
              required
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div class="input-group ">
            <input
              type="file"
              class="form-control my-3 mx-2"
              aria-label="Username"
              id="photo"
              onChange={(e) => setPic(e.target.files[0])}
              required
            />
          </div>
          <div class="input-group">
            <input
              type="password"
              class="form-control my-3 mx-2"
              placeholder="Enter password"
              aria-label="Username"
              id="password"
              required
              minLength={8}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className={Style.btn}>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center my-2">
            Already have an account
            <NavLink
              to="/login"
              className="text-danger p-1 text-decoration-none"
            >
              LogIn
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
