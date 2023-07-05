import React, { useState, useEffect } from "react";
import styles from "./detail.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [foodDetail, setFoodDetail] = useState({
    id: 0, // id
    name: "", // title
    image: "", // image
    summary: "", // summary
    healthScore: 0, // healthScore
    steps: [], // analyzedInstructions.steps
    diets: [], // diets
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await axios.get(`http://localhost:3001/recipes/${id}`);
      setFoodDetail({
        id: response.data.id,
        name: response.data.title,
        image: response.data.image,
        summary: response.data.summary,
        healthScore: response.data.healthScore,
        steps: response.data.instructions
          ? response.data.instructions
          : response.data.steps,
        diets: response.data.diets,
      });
      setLoading(false);
    };
    fetchDetail();
  }, [id]);

  return (
    <div className={styles.container}>
      {!loading ? (
        <>
          <div className={styles.card}>
            <button
              className={styles.backBtn}
              onClick={() => navigate("/home")}
            >
              Go Back
            </button>
            <h2 className={styles.name}>{foodDetail.name}</h2>
            <img
              className={styles.image}
              src={foodDetail.image}
              alt={foodDetail.name}
            />
            <p
              className={styles.summary}
              dangerouslySetInnerHTML={{ __html: foodDetail.summary }}
            ></p>
            <div className={styles.tags}>
              <span
                className={
                  foodDetail.healthScore > 30
                    ? styles.healthScoreGood
                    : styles.healthScoreBad
                }
              >
                {foodDetail.healthScore}
              </span>
              <span className={styles.diets}>
                {foodDetail.diets.join(", ")}
              </span>
            </div>
          </div>
          <div className={styles.instructions}>
            <h2>Instructions: </h2>
            <ul className={styles.list}>
              {console.log(foodDetail.steps)}
              {Array.isArray(foodDetail.steps)
                ? foodDetail.steps.map((e, i) => (
                    <li key={i} className={styles.item}>
                      {e.replace(/<[^>]*>/g, "\n")}
                    </li>
                  ))
                : foodDetail.steps.replace(/<[^>]*>/g, "\n")}
            </ul>
          </div>
        </>
      ) : (
        <div className={styles.loader}></div>
      )}
    </div>
  );
};

export default Detail;
