import React, { useState, useEffect } from "react";
import axios from "axios";
import validate from "../utils/validation";
import styles from "./form.module.css";
import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    summary: "",
    healthScore: "",
    steps: [],
    image: "",
    diets: [],
  });
  const [errors, setErrors] = useState({});
  const [diets, setDiets] = useState([]);

  const [showNotification, setShowNotification] = useState(false);
  const [showNotificationError, setShowNotificationError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
    console.log(newRecipe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      await axios.post("http://localhost:3001/recipes", newRecipe);
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
        navigate("/home", { state: { refresh: true } });
      }, 3000);
    } else {
      setShowNotificationError(true);

      setTimeout(() => {
        setShowNotificationError(false);
      }, 3000);
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
    fetchDiets();
  }, []);

  useEffect(() => {
    setErrors(validate(newRecipe));
  }, [newRecipe]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} action="">
        <div className={styles.formGroup}>
          <button
            className={styles.backButton}
            onClick={() => navigate("/home")}
          >
            Go Back
          </button>
          <label className={styles.label} htmlFor="">
            Name
          </label>
          <input
            className={styles.input}
            name="title"
            onChange={handleChange}
            type="text"
          />
          {errors?.title && <span className={styles.span}>{errors.title}</span>}
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
            name="healthScore"
            onChange={handleChange}
            type="number"
          />
          {errors?.healthScore && (
            <span className={styles.span}>{errors.healthScore}</span>
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
          <div>
            {errors?.steps && (
              <span className={styles.span}>{errors.steps}</span>
            )}
          </div>
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
                  <option key={dietIndex} value={dietIndex}>
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
          <div>
            {errors?.diets && (
              <span className={styles.span}>{errors.diets}</span>
            )}
          </div>
        </div>
        <button
          disabled={errors === {}}
          className={styles.button}
          type="submit"
        >
          Submit
        </button>
      </form>
      <Notification
        show={showNotification}
        message="Form submitted successfully"
      />
      <Notification
        show={showNotificationError}
        message="Something went wrong. Check your fields and try again."
      />
    </div>
  );
};

export default Form;
