import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import Navbar from "./Component/Navbar/Navbar";
import Error from "./Pages/Error/Error";
import Protected from "./Component/Protected";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";
import EmailVerification from "./Pages/Auth/emailVerification";
import MyProfile from "./Pages/MyProfile/MyProfile";
import UploadVideo from "./Pages/Upload/UploadVideo";
import CreatePost from "./Pages/Upload/CreatePost";
import Posts from "./Pages/Home/post/posts";
import LikedVideos from "./Pages/Home/likeVideos/likedVideos";
import Home from "./Pages/Home/Home";
import Videos from "./Pages/Home/Video/Videos";
import VideoDetail from "./Pages/videoDetail/videoDetail";
import { useDispatch, useSelector } from "react-redux";
import { GetLoginUserAsync, selectUserInfo } from "./Pages/Auth/authSlice";
import { useEffect, useState } from "react";

function App() {
  const [addRemFriend, setAddRemFriend] = useState();
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const options = {
    timeout: 5000,
    position: positions.TOP_CENTER,
  };

  useEffect(() => {
    if (user) {
      dispatch(GetLoginUserAsync());
    }
  }, [dispatch, addRemFriend]);

  return (
    <>
      <Provider template={AlertTemplate} {...options}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />}>
              <Route path="/" exact element={<Videos />} />
              <Route
                path="/posts"
                exact
                element={
                  <Protected>
                    <Posts />
                  </Protected>
                }
              />
              <Route
                path="/likedVideos"
                exact
                element={
                  <Protected>
                    <LikedVideos />{" "}
                  </Protected>
                }
              />
            </Route>

            <Route
              path="/video/:id"
              exact
              element={
                <Protected>
                  <VideoDetail
                    addRemFriend={addRemFriend}
                    setAddRemFriend={setAddRemFriend}
                  />
                </Protected>
              }
            />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route
              path="/profile"
              exact
              element={
                <Protected>
                  <MyProfile />
                </Protected>
              }
            />
            <Route
              path="/uploadVideo"
              exact
              element={
                <Protected>
                  <UploadVideo />{" "}
                </Protected>
              }
            />
            <Route
              path="/createPost"
              exact
              element={
                <Protected>
                  <CreatePost />{" "}
                </Protected>
              }
            />
            <Route path="*" element={<Error />} />
            <Route path="/forgot-password" exact element={<ForgetPassword />} />
            <Route path="/reset-password" exact element={<ResetPassword />} />
            <Route path="/verify-email" exact element={<EmailVerification />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
