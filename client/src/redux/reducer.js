import { FETCH_RECIPES, FETCH_DIETS, FIND_RECIPE } from "./actions";

const initialState = {
  recipes: [],
  diets: [],
  recipe: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECIPES:
      return { recipes: action.payload };
    case FETCH_DIETS:
      return { diets: action.payload };
    case FIND_RECIPE:
      const recipe = state.recipes.find((rec) => rec.id === action.payload);
      return { recipe: recipe };
    default:
      return state;
  }
};

export default rootReducer;
