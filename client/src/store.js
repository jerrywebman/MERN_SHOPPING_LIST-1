import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
//this gets the index.js file in the reducers folder
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));


export default store;