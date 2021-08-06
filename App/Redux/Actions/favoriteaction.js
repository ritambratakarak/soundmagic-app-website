import Network from '../../Services/Network';
import {SHOW_FAVORITE} from '../type';

export const addFavorite = (submitData) => {
  return (dispatch) => {
    if (submitData != null) {
      Network('/add-favorite-track', 'post', submitData)
        .then((res) => {
          const {response_code, response_data} = res;
          if (response_code === 200) {
            dispatch({
              type: SHOW_FAVORITE,
              payload: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch({
        type: SHOW_FAVORITE,
        payload: null,
      });
    }
  };
};

export const removeFavorite = (submitData) => {
  return (dispatch) => {
    Network('/remove-favorite-track', 'post', submitData)
      .then((res) => {
        const {response_code, response_data} = res;
        if (response_code === 200) {
          //should get the response to show the card
          dispatch({
            type: SHOW_FAVORITE,
            payload: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
