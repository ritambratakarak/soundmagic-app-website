import { CATEGORY_DATA } from '../type';

export const category = (data) => {
  console.log("category action data", data);
  return async (dispatch) => {
    dispatch({
      type: CATEGORY_DATA,
      payload: data,
    });
  };
};