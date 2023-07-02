import React from "react";
import styles from "./landing.module.css";
import landing from "../assets/landing2.jpg";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.landing}>
      <div className={styles.content}>
        <img className={styles.landingImg} src={landing} alt="Food" />
        <button className={styles.landingBtn} onClick={() => navigate("/home")}>
          Explore Recipes
        </button>
      </div>
      <footer className={styles.footer}>
        <h2 className={styles.footerSubTitle}>Henry Individual Project</h2>
        <h1 className={styles.footerTitle}>Alex Hernan Laulhe</h1>
        <div className={styles.imageContainer}>
          <a href="https://www.linkedin.com/in/alex-laulhe/">
            <img
              className={styles.footerImg}
              src="https://www.pngplay.com/wp-content/uploads/12/LinkedIn-PNG-HD-Images.png"
              alt="linkedin"
            />
          </a>
          <a href="https://github.com/ahlaulhee">
            <img
              className={styles.footerImg}
              src="https://pngimg.com/d/github_PNG83.png"
              alt="github"
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
