import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

export default combineReducers({
    //all reducers go here
    item: itemReducer
});