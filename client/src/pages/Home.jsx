import React, { useState } from "react"; // useEffect
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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
        const filteredRecipesVegetarian = [...copyRecipes].filter((rec) =>
          rec.diets.includes("lacto ovo vegetarian")
        );
        setRecipes(filteredRecipesVegetarian);
        break;
      case "Gluten Free":
        const filteredRecipesGlutenFree = [...copyRecipes].filter((rec) =>
          rec.diets.includes("gluten free")
        );
        setRecipes(filteredRecipesGlutenFree);
        break;

      case "Ketogenic":
        const filteredRecipesKetogenic = [...copyRecipes].filter((rec) =>
          rec.diets.includes("ketogenic")
        );
        setRecipes(filteredRecipesKetogenic);
        break;
      case "Pescetarian":
        const filteredRecipesPescetarian = [...copyRecipes].filter((rec) =>
          rec.diets.includes("pescatarian")
        );
        setRecipes(filteredRecipesPescetarian);
        break;
      case "Paleo":
        const filteredRecipesPaleolithic = [...copyRecipes].filter((rec) =>
          rec.diets.includes("paleolithic")
        );
        setRecipes(filteredRecipesPaleolithic);
        break;
      case "Primal":
        const filteredRecipesPrimal = [...copyRecipes].filter((rec) =>
          rec.diets.includes("primal")
        );
        setRecipes(filteredRecipesPrimal);
        break;
      case "Whole30":
        const filteredRecipesWhole30 = [...copyRecipes].filter((rec) =>
          rec.diets.includes("whole 30")
        );
        setRecipes(filteredRecipesWhole30);
        break;
      case "Low FODMAP":
        const filteredRecipesLowFodmap = [...copyRecipes].filter((rec) =>
          rec.diets.includes("fodmap friendly")
        );
        setRecipes(filteredRecipesLowFodmap);
        break;
      case "Ovo-Vegetarian":
        const filteredRecipesOvoVegetarian = [...copyRecipes].filter((rec) =>
          rec.diets.includes("dairy free")
        );
        setRecipes(filteredRecipesOvoVegetarian);
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
            fetchRecipes={fetchRecipes}
            changeOrder={changeOrder}
            changeDiet={changeDiet}
          />
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
    </div>
  );
};

export default Home;
