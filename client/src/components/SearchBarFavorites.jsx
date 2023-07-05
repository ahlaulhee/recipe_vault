import React, { useState, useEffect } from "react";
import styles from "./searchbarfavorites.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBarFavorites = ({
  handleSearchChange,
  changeOrder,
  changeDiet,
}) => {
  const [diets, setDiets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiets = async () => {
      const response = await axios.get("http://localhost:3001/diets");
      setDiets(response.data);
    };
    fetchDiets();
  }, []);

  return (
    <div className={styles.searchContainer}>
      <button className={styles.searchBtn} onClick={() => navigate("/home")}>
        Home
      </button>
      <input
        onChange={handleSearchChange}
        className={styles.searchBar}
        type="text"
        placeholder="Search..."
      />
      <select onChange={changeOrder} className={styles.selectBox}>
        <option key={1} value="ASC">
          Ascending
        </option>
        <option key={2} value="DESC">
          Descending
        </option>
        <option key={3} value="HEALTHSCORE">
          Health Score
        </option>
      </select>
      <select className={styles.selectBox} onChange={changeDiet}>
        <option key={0} value="">
          Select a Diet
        </option>
        {diets.map((diet, index) => (
          <option key={index} value={diet.name}>
            {diet.name}
          </option>
        ))}
      </select>
      <button
        className={styles.searchBtn}
        onClick={() => navigate("/favorites")}
      >
        My Favorites!
      </button>
      <button className={styles.searchBtn} onClick={() => navigate("/form")}>
        Share a recipe with us!
      </button>
    </div>
  );
};

export default SearchBarFavorites;
