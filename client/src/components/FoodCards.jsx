import React from "react";
import styles from "./foodcards.module.css";
import FoodCard from "./FoodCard";

const FoodCards = ({ recipes }) => {
  return (
    <div className={styles.recipes}>
      {recipes.map((rec, i) => (
        <FoodCard
          key={i}
          id={rec.id}
          title={rec.title}
          image={rec.image}
          diets={rec.diets}
        />
      ))}
    </div>
  );
};

export default FoodCards;
