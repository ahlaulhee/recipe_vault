// import React, { useState } from "react";
import styles from "./pagination.module.css";

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        {currentPage !== 1 && (
          <button
            className={styles.button}
            type="button"
            onClick={() => {
              setCurrentPage(currentPage - 1);
              paginate(currentPage - 1);
            }}
          >
            Prev
          </button>
        )}
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={
              currentPage === number ? styles.activeButton : styles.button
            }
            type="button"
            onClick={() => {
              setCurrentPage(number);
              paginate(number);
            }}
          >
            {number}
          </button>
        ))}
        {currentPage !== pageNumbers[pageNumbers.length - 1] && (
          <button
            className={styles.button}
            type="button"
            onClick={() => {
              setCurrentPage(currentPage + 1);
              paginate(currentPage + 1);
            }}
          >
            Next
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
