import { combineReducers } from 'redux' 
import authReducer from './authReducer'
import categoryReducer from './categoryReducer'
import { favoriteReducer } from './favoritereducer'


export default combineReducers({
    userdata: authReducer,
    categorydata: categoryReducer,
    favorite: favoriteReducer
})