import axios from "axios";

export const FETCH_RECIPES = "FETCH_RECIPES";
export const FETCH_DIETS = "FETCH_DIETS";
export const FIND_RECIPE = "FIND_RECIPE";

export const fetchRecipes = () => {
  const endpoint = "http://localhost:3001/recipes";
  return async (dispatch) => {
    const response = await axios.get(endpoint);
    return dispatch({
      type: FETCH_RECIPES,
      payload: response.data.allRecipesDB,
    });
  };
};

export const fetchDiets = () => {
  const endpoint = "http://localhost:3001/diets";
  return async (dispatch) => {
    const response = await axios.get(endpoint);
    return dispatch({
      type: FETCH_DIETS,
      payload: response.data,
    });
  };
};

export const findRecipe = (id) => ({
  type: FIND_RECIPE,
  payload: id,
});
