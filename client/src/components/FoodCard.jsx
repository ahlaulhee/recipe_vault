import React from "react";
import styles from "./foodcard.module.css";

const FoodCard = ({ name, image, diet }) => {
  return (
    <div className={styles.recipeCard}>
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
