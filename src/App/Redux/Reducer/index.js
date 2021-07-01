import { combineReducers } from 'redux' 
import authReducer from './auth'
// import locationReducer from './locationReducer'
// import profileReducer from "./userProfile"

export default combineReducers({
    userdata: authReducer,
    // location: locationReducer,
    // profiledata: profileReducer
})