import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./error.module.css";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src="https://www.pngkey.com/png/full/212-2123453_latest-news-404-logo.png"
        alt="404 Logo"
      />
      <h2 className={styles.h2}>404 Error</h2>
      <h3 className={styles.h3}>Sorry, page not found</h3>
      <button className={styles.btn} onClick={() => navigate("/home")}>
        Back to home
      </button>
    </div>
  );
};

export default Error;
