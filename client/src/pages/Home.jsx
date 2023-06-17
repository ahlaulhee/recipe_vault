import React from "react";
import styles from "./home.module.css";
import SearchBar from "../components/SearchBar";
import FoodCards from "../components/FoodCards";

const Home = () => {
  const testRecipes = [
    {
      name: "cheese",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
      diet: ["1", "2", "3"],
    },
    {
      name: "ham",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
      diet: ["1", "2"],
    },
    {
      name: "cheeseburger",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
      diet: ["1"],
    },
  ];
  return (
    <div className={styles.home}>
      <SearchBar />
      <FoodCards recipe={testRecipes} />
    </div>
  );
};

export default Home;
