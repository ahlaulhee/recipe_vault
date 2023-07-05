import React from "react";
import { useDispatch } from "react-redux";
import styles from "./foodcards.module.css";
import FoodCard from "./FoodCard";
import { toggleFavorite } from "../redux/actions";

const FoodCards = ({ recipes }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.recipes}>
      {recipes.map((rec, i) => (
        <FoodCard
          key={i}
          id={rec.id}
          title={rec.title}
          image={rec.image}
          diets={rec.diets}
          addFavorite={() => dispatch(toggleFavorite(rec))}
        />
      ))}
    </div>
  );
};

export default FoodCards;
