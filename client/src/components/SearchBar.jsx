import React from "react";
import styles from "./searchbar.module.css";

const SearchBar = () => {
  return (
    <div className={styles.searchContainer}>
      <input className={styles.searchBar} type="text" placeholder="Search..." />
      {/* <button className={styles.searchBtn}>Search</button> */}
      <select className={styles.selectBox}>
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
      <select className={styles.selectBox}>
        <option value="">Dieta 1</option>
        <option value="">Dieta 2</option>
        <option value="">Dieta 3</option>
      </select>
    </div>
  );
};

export default SearchBar;
