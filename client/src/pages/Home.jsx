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
  // const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.refresh) {
      fetchRecipes();
    }
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

  const changeDiet = (e) => {
    paginate(1);
    switch (e.target.value) {
      case "Vegan":
        const filteredRecipesVegan = [...copyRecipes].filter((rec) =>
          rec.diets.includes("vegan")
        );
        setRecipes(filteredRecipesVegan);
        break;
      case "Vegetarian":
        const filteredRecipesVegetarian = [...copyRecipes].filter((rec) => {
          let diets = rec.diets.map((diet) => diet.toLowerCase());
          let searchStrings = ["vegetarian", "lacto ovo vegetarian"];
          return searchStrings.some((str) => diets.includes(str));
        });
        setRecipes(filteredRecipesVegetarian);
        break;
      case "Gluten Free":
        const filteredRecipesGlutenFree = [...copyRecipes].filter((rec) => {
          let diets = rec.diets.map((diet) => diet.toLowerCase());
          let searchStrings = ["gluten free"];
          return searchStrings.some((str) => diets.includes(str));
        });
        setRecipes(filteredRecipesGlutenFree);
        break;

      case "Ketogenic":
        const filteredRecipesKetogenic = [...copyRecipes].filter((rec) => {
          let diets = rec.diets.map((diet) => diet.toLowerCase());
          let searchStrings = ["ketogenic"];
          return searchStrings.some((str) => diets.includes(str));
        });
        setRecipes(filteredRecipesKetogenic);
        break;
      case "Pescetarian":
        const filteredRecipesPescetarian = [...copyRecipes].filter((rec) => {
          let diets = rec.diets.map((diet) => diet.toLowerCase());
          let searchStrings = ["pescatarian", "pescetarian"];
          return searchStrings.some((str) => diets.includes(str));
        });
        setRecipes(filteredRecipesPescetarian);
        break;
      case "Paleo":
        const filteredRecipesPaleolithic = [...copyRecipes].filter((rec) => {
          let diets = rec.diets.map((diet) => diet.toLowerCase());
          let searchStrings = ["paleo", "paleolithic"];
          return searchStrings.some((str) => diets.includes(str));
        });
        setRecipes(filteredRecipesPaleolithic);
        break;
      case "Primal":
        const filteredRecipesPrimal = [...copyRecipes].filter((rec) => {
          let diets = rec.diets.map((diet) => diet.toLowerCase());
          let searchStrings = ["primal"];
          return searchStrings.some((str) => diets.includes(str));
        });
        setRecipes(filteredRecipesPrimal);
        break;
      case "Whole30":
        const filteredRecipesWhole30 = [...copyRecipes].filter((rec) => {
          let diets = rec.diets.map((diet) => diet.toLowerCase());
          let searchStrings = ["whole 30", "whole30"];
          return searchStrings.some((str) => diets.includes(str));
        });
        setRecipes(filteredRecipesWhole30);
        break;
      case "Low FODMAP":
        const filteredRecipesLowFodmap = [...copyRecipes].filter((rec) => {
          let diets = rec.diets.map((diet) => diet.toLowerCase());
          let searchStrings = ["fodmap friendly", "low fodmap"];
          return searchStrings.some((str) => diets.includes(str));
        });
        setRecipes(filteredRecipesLowFodmap);
        break;
      case "Ovo-Vegetarian":
        const filteredRecipesOvoVegetarian = [...copyRecipes].filter((rec) => {
          let diets = rec.diets.map((diet) => diet.toLowerCase());
          let searchStrings = ["dairy free", "ovo-vegetarian"];
          return searchStrings.some((str) => diets.includes(str));
        });
        setRecipes(filteredRecipesOvoVegetarian);
        break;
      case "Lacto-Vegetarian":
        const filteredRecipesLactoVegetarian = [...copyRecipes].filter(
          (rec) => {
            let diets = rec.diets.map((diet) => diet.toLowerCase());
            let searchStrings = ["lacto-vegetarian"];
            return searchStrings.some((str) => diets.includes(str));
          }
        );
        setRecipes(filteredRecipesLactoVegetarian);
        break;
      // didnt found lacto vegetarian tag on diets
      default:
        setRecipes(copyRecipes);
        break;
    }
  };

  const fetchRecipesByName = async () => {
    paginate(1);
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

  const fetchRecipes = async () => {
    paginate(1);
    setLoading(true);
    const response = await axios.get("http://localhost:3001/recipes");

    setRecipes(
      response.data.combinedRecipes.sort((a, b) =>
        a.title.localeCompare(b.title)
      )
    );
    setCopyRecipes(
      response.data.combinedRecipes.sort((a, b) =>
        a.title.localeCompare(b.title)
      )
    );
    setLoading(false);
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
