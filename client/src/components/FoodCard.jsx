import React from "react";
import styles from "./foodcard.module.css";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ id, name, image, diet }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.recipeCard}
      onClick={() => navigate(`/detail/${id}`)}
    >
      <img className={styles.recipeImage} src={image} alt={name} />
      <h2 className={styles.recipeName}>{name}</h2>
      <div className={styles.recipeTags}>
        {diet.map((diet, index) => (
          <span key={index} className={styles.recipeTag}>
            {diet}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FoodCard;
