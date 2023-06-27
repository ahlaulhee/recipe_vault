import React from "react";
import styles from "./foodcards.module.css";
import FoodCard from "./FoodCard";

const FoodCards = ({ recipes }) => {
  // const allDiets = () => {
  //   const copyDiets = [...recipes.diets]
  //   if (recipes.vegetarian) copyDiets.push("vegetarian");
  //   if (recipes.vegan) copyDiets.push("vegan");
  //   if (recipes.glutenFree) copyDiets.push("glutenFree");
  // }
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
