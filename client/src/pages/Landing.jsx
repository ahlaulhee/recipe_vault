import React from "react";
import styles from "./landing.module.css";
import landing from "../assets/landing.jpg";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.landing}>
      <img className={styles.landingImg} src={landing} alt="Food" />
      <button className={styles.landingBtn} onClick={() => navigate("/home")}>
        Explore Recipes
      </button>
    </div>
  );
};

export default Landing;
