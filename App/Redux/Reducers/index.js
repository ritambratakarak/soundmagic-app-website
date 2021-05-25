import { combineReducers } from 'redux' 
import authReducer from './authReducer'
import categoryReducer from './categoryReducer'


export default combineReducers({
    userdata: authReducer,
    categorydata: categoryReducer
})