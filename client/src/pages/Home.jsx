import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import SearchBar from "../components/SearchBar";
import FoodCards from "../components/FoodCards";
import axios from "axios";
import Pagination from "../components/Pagination";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/recipes");

      setRecipes(
        response.data.combinedRecipes.sort((a, b) =>
          a.title.localeCompare(b.title)
        )
      );
      setLoading(false);
    };
    fetchRecipes();
  }, []);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  // const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const changeOrder = (e) => {
    switch (e.target.value) {
      case "ASC":
        const sortedRecipesAsc = [...recipes].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setRecipes(sortedRecipesAsc);
        break;
      case "DESC":
        const sortedRecipesDesc = [...recipes].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        setRecipes(sortedRecipesDesc);
        break;
      case "HEALTHSCORE":
        const sortedRecipesHealthScore = [...recipes].sort(
          (a, b) => b.healthScore - a.healthScore
        );
        setRecipes(sortedRecipesHealthScore);
        break;

      default:
        break;
    }
  };

  const fetchRecipesByName = async () => {
    if (searchTerm) {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3001/recipes?name=${searchTerm}`
      );
      setRecipes(response.data.combinedRecipes);
      setLoading(false);
    } else {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/recipes");
      setRecipes(response.data.combinedRecipes);
      setLoading(false);
    }
  };

  const filteredRecipes = recipes.filter((rec) =>
    rec.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentFilteredRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  return (
    <div className={styles.home}>
      {!loading && (
        <>
          <SearchBar
            handleSearchChange={handleSearchChange}
            fetchRecipesByName={fetchRecipesByName}
            changeOrder={changeOrder}
          />
          <FoodCards recipes={currentFilteredRecipes} />
          <Pagination
            postsPerPage={recipesPerPage}
            totalPosts={filteredRecipes.length}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

export default Home;
