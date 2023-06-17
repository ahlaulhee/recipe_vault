import React from "react";
import styles from "./foodcards.module.css";
import FoodCard from "./FoodCard";

const FoodCards = ({ recipe }) => {
  return (
    <div className={styles.recipes}>
      {recipe.map((rec) => (
        <FoodCard name={rec.name} image={rec.image} diet={rec.diet} />
      ))}
    </div>
  );
};

export default FoodCards;
