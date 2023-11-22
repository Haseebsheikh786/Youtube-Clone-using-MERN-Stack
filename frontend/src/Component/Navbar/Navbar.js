import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { BiVideoPlus, BiSolidUserCircle } from "react-icons/bi";
import { IoMdNotificationsOutline, IoIosLogOut } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { GrYoutube } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdAppShortcut } from "react-icons/md";
import { FaPlayCircle } from "react-icons/fa";
import { Logout, selectUserInfo } from "../../Pages/Auth/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const handleLogout = () => {
    dispatch(Logout());
  };

  return (
    <>
      <nav className={styles.navbar}>
        <ul class={styles.navbarContainer}>
          <div className={styles.logo}>
            <GiHamburgerMenu className={styles.burgerIcon} />
            <NavLink to="/" className="text-decoration-none">
              <GrYoutube className={styles.YoutubeIcon} />
              <b>YouTube</b>
             </NavLink>
          </div>
          <div className={styles.Search}>
            <li>
              <input type="search" placeholder="Search" />
              <button className={styles.searchIcon}>
                <AiOutlineSearch className="mb-2" />
              </button>
            </li>
          </div>
          <div className={styles.RightIcons}>
            <NavLink class="nav-item dropdown text-decoration-none">
              <a
                class="nav-link"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <BiVideoPlus className={styles.addVideoIcon} />
              </a>
              <ul
                class="dropdown-menu bg-secondary text-white"
                aria-labelledby="navbarDropdown"
              >
                <NavLink to="/uploadVideo" className="text-decoration-none">
                  <a
                    class="dropdown-item text-white"
                    href="#"
                    id={styles.navLinks}
                  >
                    <FaPlayCircle className="mb-1 fs-5" />
                    <span className="mx-2">Upload video </span>
                  </a>
                </NavLink>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <NavLink to="/createPost" className="text-decoration-none">
                  <a
                    class="dropdown-item text-white"
                    href="#"
                    id={styles.navLinks}
                  >
                    <IoCreateOutline className="mb-1 fs-4" />
                    <span className="mx-2">Create post </span>{" "}
                  </a>
                </NavLink>
              </ul>
            </NavLink>
            <IoMdNotificationsOutline className={styles.NotiIcon} />
            <li class="nav-item dropdown">
              <a
                class="nav-link "
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user ? (
                  <div className={styles.icon}>
                    <img
                      src={`http://localhost:8000/` + user?.photo} 
                      alt="error"
                      class={styles.imageIcon}
                    />
                  </div>
                ) : (
                  <div className={styles.icon}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkiIFjCOZ-mMeqxd2ryrneiHedE8G9S0AboA&usqp=CAU"
                      alt="error"
                      class={styles.imageIcon}
                    />
                  </div>
                )}
              </a>
              <ul
                class="dropdown-menu bg-secondary text-white"
                aria-labelledby="navbarDropdown"
              >
                <NavLink to="/profile" className="text-decoration-none">
                  <a
                    class="dropdown-item text-white"
                    href="#"
                    id={styles.navLinks}
                  >
                    <BiSolidUserCircle className="mb-1 fs-4" />
                    <span className="mx-2">My profile </span>{" "}
                  </a>
                </NavLink>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a
                    onClick={handleLogout}
                    class="dropdown-item text-white"
                    href="#"
                    id={styles.navLinks}
                  >
                    <IoIosLogOut className="mb-1 fs-4" />
                    <span className="mx-2">SignOut </span>{" "}
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
              </ul>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
