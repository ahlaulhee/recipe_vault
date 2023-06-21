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
      id: 1,
      name: "cheese",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
      diet: ["1", "2", "3"],
    },
    {
      id: 2,
      name: "ham",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
      diet: ["1", "2"],
    },
    {
      id: 3,
      name: "cheeseburger",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
      diet: ["1"],
    },
    {
      id: 4,
      name: "cheese",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
      diet: ["1", "2", "3"],
    },
    {
      id: 5,
      name: "ham",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
      diet: ["1", "2"],
    },
    {
      id: 6,
      name: "cheeseburger",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
      diet: ["1"],
    },
    {
      id: 7,
      name: "cheese",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
      diet: ["1", "2", "3"],
    },
    {
      id: 8,
      name: "ham",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
      diet: ["1", "2"],
    },
    {
      id: 9,
      name: "cheeseburger",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
      diet: ["1"],
    },
    {
      id: 10,
      name: "cheese",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
      diet: ["1", "2", "3"],
    },
    {
      id: 11,
      name: "ham",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
      diet: ["1", "2"],
    },
    {
      id: 12,
      name: "cheeseburger",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
      diet: ["1"],
    },
    {
      id: 13,
      name: "cheese",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
      diet: ["1", "2", "3"],
    },
    {
      id: 14,
      name: "ham",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
      diet: ["1", "2"],
    },
    {
      id: 15,
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
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecipes = testRecipes.filter((rec) =>
    rec.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentFilteredRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  return (
    <div className={styles.home}>
      <SearchBar handleSearchChange={handleSearchChange} />
      {/* {searchTerm ? (
        <FoodCards recipes={currentFilteredRecipes} />
      ) : (
        <FoodCards recipes={currentRecipes} />
      )} */}
      <FoodCards recipes={currentFilteredRecipes} />
      <Pagination
        postsPerPage={recipesPerPage}
        totalPosts={filteredRecipes.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Home;
