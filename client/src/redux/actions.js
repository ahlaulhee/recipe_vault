export const FETCH_FAVORITES = "FETCH_FAVORITES";
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const FILTER_FAVORITES = "FILTER_FAVORITES";
export const ORDER_FAVORITES = "ORDER_FAVORITES";
// export const ADD_FAVORITE = "ADD_FAVORITE";
// export const REMOVE_FAVORITE = "REMOVE_FAVORITE";

export const fetchFavorites = () => ({
  type: FETCH_FAVORITES,
});

export const toggleFavorite = (recipe) => ({
  type: TOGGLE_FAVORITE,
  payload: recipe,
});

// export const addFavorite = (recipe) => ({
//   type: ADD_FAVORITE,
//   payload: recipe,
// });

// export const removeFavorite = (recipe) => ({
//   type: REMOVE_FAVORITE,
//   payload: recipe,
// });

export const filterFavorites = (diet) => {
  return {
    type: FILTER_FAVORITES,
    payload: diet,
  };
};
export const orderFavorites = (order) => {
  return {
    type: ORDER_FAVORITES,
    payload: order,
  };
};
