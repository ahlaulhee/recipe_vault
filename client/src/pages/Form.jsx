import React, { useState, useEffect } from "react";
import axios from "axios";
import validate from "../utils/validation";
import styles from "./form.module.css";

const Form = () => {
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    summary: "",
    health_score: "",
    steps: [],
    image: "",
    diets: [],
  });
  const [errors, setErrors] = useState({});
  const [diets, setDiets] = useState([]);

  const handleChange = (e) => {
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      await axios.post("http://localhost:3001/recipes", newRecipe);
    }
  };

  const handleDeleteStep = (index) => {
    const updatedSteps = [...newRecipe.steps];
    updatedSteps.splice(index, 1);
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      steps: updatedSteps,
    }));
  };

  const handleSelectChange = (index, value) => {
    const updatedDiets = [...newRecipe.diets];
    updatedDiets[index] = value;
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      diets: updatedDiets,
    }));
  };

  const handleRemoveDiet = (index) => {
    const updatedDiets = [...newRecipe.diets];
    updatedDiets.splice(index, 1);
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      diets: updatedDiets,
    }));
  };

  useEffect(() => {
    const fetchDiets = async () => {
      const response = await axios.get("http://localhost:3001/diets");
      setDiets(response.data);
    };
    console.log("a");
    fetchDiets();
  }, []);

  useEffect(() => {
    setErrors(validate(newRecipe));
  }, [newRecipe]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} action="">
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="">
            Name
          </label>
          <input
            className={styles.input}
            name="name"
            onChange={handleChange}
            type="text"
          />
          {errors?.name && <span className={styles.span}>{errors.name}</span>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="">
            Summary
          </label>
          <input
            className={styles.input}
            name="summary"
            onChange={handleChange}
            type="text"
          />
          {errors?.summary && (
            <span className={styles.span}>{errors.summary}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="">
            Health Score
          </label>
          <input
            className={styles.input}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            name="health_score"
            onChange={handleChange}
            type="number"
          />
          {errors?.health_score && (
            <span className={styles.span}>{errors.health_score}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="">
            Recipe steps
          </label>
          {newRecipe.steps.map((step, index) => (
            <div className={styles.formGroupContainer}>
              <input
                className={styles.input}
                key={index}
                type="text"
                value={step}
                onChange={(e) => {
                  const updatedSteps = [...newRecipe.steps];
                  updatedSteps[index] = e.target.value;
                  setNewRecipe((prevRecipe) => ({
                    ...prevRecipe,
                    steps: updatedSteps,
                  }));
                }}
              />
              <button
                className={styles.delButton}
                type="button"
                onClick={() => handleDeleteStep(index)}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            className={styles.addButton}
            type="button"
            onClick={() =>
              setNewRecipe((prevRecipe) => ({
                ...prevRecipe,
                steps: [...prevRecipe.steps, ""],
              }))
            }
          >
            Add
          </button>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="">
            Image
          </label>
          <input
            className={styles.input}
            name="image"
            onChange={handleChange}
            type="text"
          />
          {errors?.image && <span className={styles.span}>{errors.image}</span>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="">
            Diets
          </label>
          {newRecipe.diets.map((e, index) => (
            <div className={styles.formGroupContainer} key={index}>
              <select
                className={styles.select}
                value={newRecipe.diets[index] || ""}
                onChange={(e) => handleSelectChange(index, e.target.value)}
              >
                <option value="">Select Diet</option>
                {diets.map((diet, dietIndex) => (
                  <option key={dietIndex} value={diet.name}>
                    {diet.name}
                  </option>
                ))}
              </select>
              <button
                className={styles.delButton}
                type="button"
                onClick={() => handleRemoveDiet(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className={styles.addButton}
            type="button"
            onClick={() =>
              setNewRecipe((prevRecipe) => ({
                ...prevRecipe,
                diets: [...prevRecipe.diets, ""],
              }))
            }
          >
            Add
          </button>
        </div>
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
