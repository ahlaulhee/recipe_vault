import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./home.module.css";
import SearchBar from "../components/SearchBar";
import FoodCards from "../components/FoodCards";
import axios from "axios";
import Pagination from "../components/Pagination";

const Home = ({
  recipes,
  setRecipes,
  copyRecipes,
  setCopyRecipes,
  loading,
  setLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12;

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

  const location = useLocation();

  useEffect(() => {
    if (location.state?.refresh) {
      fetchRecipes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    paginate(1);
  };

  const changeOrder = (e) => {
    paginate(1);
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

  const dietSearchStrings = {
    Vegan: ["vegan"],
    Vegetarian: ["vegetarian", "lacto ovo vegetarian"],
    "Gluten Free": ["gluten free"],
    Ketogenic: ["ketogenic"],
    Pescetarian: ["pescatarian", "pescetarian"],
    Paleo: ["paleo", "paleolithic"],
    Primal: ["primal"],
    Whole30: ["whole 30", "whole30"],
    "Low FODMAP": ["fodmap friendly", "low fodmap"],
    "Ovo-Vegetarian": ["dairy free", "ovo-vegetarian"],
    "Lacto-Vegetarian": ["lacto-vegetarian"],
  };

  const changeDiet = (e) => {
    paginate(1);
    const dietType = e.target.value;
    const searchStrings = dietSearchStrings[dietType];

    if (searchStrings) {
      const filteredRecipes = [...copyRecipes].filter((rec) => {
        let diets = rec.diets.map((diet) => diet.toLowerCase());
        return searchStrings.some((str) => diets.includes(str));
      });
      setRecipes(filteredRecipes);
    } else {
      setRecipes(copyRecipes);
    }
  };

  const fetchData = async (url) => {
    setLoading(true);
    const response = await axios.get(url);
    const sortedRecipes = response.data.combinedRecipes.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setLoading(false);
    return sortedRecipes;
  };

  const fetchRecipesByName = async () => {
    paginate(1);
    const url = searchTerm
      ? `http://localhost:3001/recipes?name=${searchTerm}`
      : "http://localhost:3001/recipes";
    const sortedRecipes = await fetchData(url);
    setRecipes(sortedRecipes);
  };

  const fetchRecipes = async () => {
    paginate(1);
    const url = "http://localhost:3001/recipes";
    const sortedRecipes = await fetchData(url);
    setRecipes(sortedRecipes);
    setCopyRecipes(sortedRecipes);
    setSearchTerm("");
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
      {!loading ? (
        <>
          <SearchBar
            handleSearchChange={handleSearchChange}
            fetchRecipesByName={fetchRecipesByName}
            fetchRecipes={fetchRecipes}
            changeOrder={changeOrder}
            changeDiet={changeDiet}
          />
          {currentFilteredRecipes.length === 0 ? (
            <h3 className={styles.notFound}>
              No recipes found with these parameters.
            </h3>
          ) : (
            <>
              <FoodCards recipes={currentFilteredRecipes} />
              <Pagination
                postsPerPage={recipesPerPage}
                totalPosts={filteredRecipes.length}
                paginate={paginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </>
      ) : (
        <div className={styles.loader}></div>
      )}
    </div>
  );
};

export default Home;
