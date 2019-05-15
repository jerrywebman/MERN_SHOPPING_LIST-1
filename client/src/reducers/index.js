import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    //all reducers go here
    item: itemReducer,
    error: errorReducer,
    auth: authReducer
});