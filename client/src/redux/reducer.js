import {
  FETCH_FAVORITES,
  TOGGLE_FAVORITE,
  FILTER_FAVORITES,
  ORDER_FAVORITES,
  // ADD_FAVORITE,
  // REMOVE_FAVORITE,
} from "./actions";

const initialState = {
  allFavorites: [],
  favorites: [],
};

const dietSearchStrings = {
  Vegan: ["vegan"],
  Vegetarian: ["vegetarian", "lacto ovo vegetarian"],
  "Gluten Free": ["gluten free"],
  Ketogenic: ["ketogenic"],
  Pescetarian: ["pescatarian", "pescetarian"],
  Paleo: ["paleo", "paleolithic"],
  Primal: ["primal"],
  Whole30: ["whole 30", "whole30"],
  "Low FODMAP": ["fodmap friendly", "low fodmap"],
  "Ovo-Vegetarian": ["dairy free", "ovo-vegetarian"],
  "Lacto-Vegetarian": ["lacto-vegetarian"],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAVORITES:
      return state.allFavorites;
    case TOGGLE_FAVORITE:
      const isFavorite = state.favorites.some(
        (recipe) => recipe.title === action.payload.title
      );
      const newFavorites = isFavorite
        ? state.favorites.filter(
            (recipe) => recipe.title !== action.payload.title
          )
        : [...state.favorites, action.payload];
      return {
        ...state,
        favorites: newFavorites,
        allFavorites: newFavorites,
      };
    // case ADD_FAVORITE:
    //   return [...state, action.payload];
    // case REMOVE_FAVORITE:
    //   return state.filter((recipe) => recipe.title !== action.payload.title);
    case FILTER_FAVORITES:
      const searchStrings = dietSearchStrings[action.payload];

      if (!searchStrings) return { ...state, favorites: state.allFavorites };
      const allFavoritesCopy = [...state.allFavorites];
      let filteredFavorites = [];
      if (searchStrings) {
        filteredFavorites = [...allFavoritesCopy].filter((rec) => {
          let diets = rec.diets.map((diet) => diet.toLowerCase());
          return searchStrings.some((str) => diets.includes(str));
        });
      }
      return { ...state, favorites: filteredFavorites };
    case ORDER_FAVORITES:
      let orderedFavorites = [];
      if (action.payload === "ASC") {
        orderedFavorites = [...state.favorites].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      } else if (action.payload === "DESC") {
        orderedFavorites = [...state.favorites].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      } else if (action.payload === "HEALTHSCORE") {
        orderedFavorites = [...state.favorites].sort(
          (a, b) => b.healthScore - a.healthScore
        );
      }
      return {
        ...state,
        favorites: orderedFavorites,
      };
    default:
      return state;
  }
};

export default rootReducer;
