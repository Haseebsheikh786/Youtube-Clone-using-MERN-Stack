import React from "react";
import styles from "./Error.module.css";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Error 404 - Page not found</div>
      <div className={styles.body}>
        Go back to{" "}
        <Link to="/" className={styles.Home}>
          Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
