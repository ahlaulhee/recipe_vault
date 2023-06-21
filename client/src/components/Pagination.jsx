import styles from "./pagination.module.css";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={styles.button}
            type="button"
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
