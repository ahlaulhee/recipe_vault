import React, { useState, useEffect } from "react";
import styles from "./searchbar.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBar = ({ handleSearchChange, fetchRecipesByName, changeOrder }) => {
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
      <input
        onChange={handleSearchChange}
        className={styles.searchBar}
        type="text"
        placeholder="Search..."
      />
      <button className={styles.searchBtn} onClick={fetchRecipesByName}>
        Search
      </button>
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
      <select className={styles.selectBox}>
        <option key={0} value="">
          Select a Diet
        </option>
        {diets.map((diet, index) => (
          <option key={index} value={diet.name}>
            {diet.name}
          </option>
        ))}
      </select>
      <button className={styles.searchBtn} onClick={() => navigate("/form")}>
        +
      </button>
    </div>
  );
};

export default SearchBar;
