import React from "react";
import styles from "./foodcard.module.css";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ id, title, image, diets }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.recipeCard}
      onClick={() => navigate(`/detail/${id}`)}
    >
      <img className={styles.recipeImage} src={image} alt={title} />
      <h2 className={styles.recipeName}>{title}</h2>
      <div className={styles.recipeTags}>
        {diets.map((diet, index) => (
          <span key={index} className={styles.recipeTag}>
            {diet}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FoodCard;
