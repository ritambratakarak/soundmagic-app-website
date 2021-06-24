import { SHOW_FAVORITE } from "../type";


export const favoriteReducer = (state = null, action) => {
  switch (action.type) {
    case SHOW_FAVORITE:
      return {
        ...state,
        favorite: action.payload,
      };
    default:
      return state;
  }
};
