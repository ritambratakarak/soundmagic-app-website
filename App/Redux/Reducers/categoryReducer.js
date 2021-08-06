import {CATEGORY_DATA} from '../type'

export default function(state = [], action) {
    switch (action.type) {
      case CATEGORY_DATA:
        return action.payload;
      default :
    }
    return state
  }
  