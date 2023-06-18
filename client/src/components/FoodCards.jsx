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
          name={rec.name}
          image={rec.image}
          diet={rec.diet}
        />
      ))}
    </div>
  );
};

export default FoodCards;
