import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FoodCards from "../components/FoodCards";
import styles from "./favorites.module.css";
import SearchBarFavorites from "../components/SearchBarFavorites";
import Pagination from "../components/Pagination";
import { filterFavorites, orderFavorites } from "../redux/actions";

function Favorites() {
  const favorites = useSelector((state) => state.favorites);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const recipesPerPage = 12;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredRecipes = favorites.filter((rec) =>
    rec.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentFilteredRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    paginate(1);
  };

  const changeOrder = (e) => {
    console.log(e.target.value);
    dispatch(orderFavorites(e.target.value));
  };
  const changeDiet = (e) => {
    console.log(e.target.value);
    dispatch(filterFavorites(e.target.value));
  };

  return (
    <div>
      <SearchBarFavorites
        handleSearchChange={handleSearchChange}
        changeOrder={changeOrder}
        changeDiet={changeDiet}
      />
      {favorites.length ? (
        <FoodCards recipes={currentFilteredRecipes} />
      ) : (
        <h3 className={styles.notFound}>
          You don't have any favorite recipe with these parameters.
        </h3>
      )}
      <Pagination
        postsPerPage={recipesPerPage}
        totalPosts={favorites.length}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Favorites;
