import { combineReducers } from 'redux' 
import authReducer from './auth'
import { favoriteReducer } from './favoritereducer'

export default combineReducers({
    userdata: authReducer,
    favorite: favoriteReducer
    // location: locationReducer,
    // profiledata: profileReducer
})