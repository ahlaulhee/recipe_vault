import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import SearchBar from "../components/SearchBar";
import FoodCards from "../components/FoodCards";
import axios from "axios";
import Pagination from "../components/Pagination";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);

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

  // useEffect(() => {
  //   const fetchRecipes = async () => {
  // setLoading(true);
  //     const response = await axios.get('http://localhost:3001/recipes')
  //     setRecipes(response.data);
  // setLoading(false);

  //   }
  //   fetchRecipes()
  // }, [])

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = testRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.home}>
      <SearchBar />
      <FoodCards recipe={currentRecipes} />
      <Pagination
        postsPerPage={recipesPerPage}
        totalPosts={testRecipes.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Home;
