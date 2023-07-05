import React from "react";
import styles from "./foodcard.module.css";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ id, title, image, diets, addFavorite }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    if (!event.target.classList.contains(styles.favoriteBtn)) {
      navigate(`/detail/${id}`);
    }
  };
  return (
    <div className={styles.recipeCard} onClick={handleClick}>
      <img className={styles.recipeImage} src={image} alt={title} />
      <div className={styles.infoContainer}>
        <h2 className={styles.recipeName}>{title}</h2>
        <button className={styles.favoriteBtn} onClick={addFavorite}>
          ❤️
        </button>
      </div>
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
