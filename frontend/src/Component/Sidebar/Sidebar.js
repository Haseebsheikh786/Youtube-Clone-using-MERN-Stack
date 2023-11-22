import React from "react";
import Style from "./Sidebar.module.css";
import { AiFillHome, AiFillLike,   } from "react-icons/ai";
import { MdAppShortcut, } from "react-icons/md";
import { BiSolidVideos } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";
 
const Sidebar = () => {
  return (
    <>
      <nav>
        <ul className={Style.Sidebar}>
          <NavLink to="/" className={Style.link}>
            <AiFillHome className={Style.icon} />
            <p>Home</p>
          </NavLink>
          <NavLink to="posts" className={Style.link}>
            <IoCreateOutline className={Style.icon} />
            <p>Posts</p>
          </NavLink>
          <NavLink to="likedVideos" className={Style.link}>
            <AiFillLike className={Style.icon} />
            <p>Liked videos</p>
          </NavLink>
          <NavLink to="/profile" className={Style.link}>
            <BiSolidVideos className={Style.icon} />
            <p className="px-1">You</p>
          </NavLink>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Sidebar;
