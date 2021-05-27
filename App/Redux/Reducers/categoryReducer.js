import {CATEGORY_DATA} from '../type'

export default function(state = [], action) {
  console.log("category reducer data", action, state);
    switch (action.type) {
      case CATEGORY_DATA:
        return action.payload;
      default :
    }
    return state
  }
  