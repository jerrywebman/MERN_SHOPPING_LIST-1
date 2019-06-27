import axios from 'axios';
//this helps us get tokens and add them to the headers
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
//importing our types
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
//dispatch will be used to send the types
export const getItems = () => dispatch => {
    //since we already set the loading is true  
    dispatch(setItemsLoading());
    axios
        .get('/api/items')
        .then(res =>
            dispatch({
                type: GET_ITEMS,
                //res.data is the response that come from the backend in our
                //routes/api
                payload: res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//adding add item action
export const addItem = (item) => (dispatch, getState) => {
    axios
        //tokenConfig(getState) helps attach the token to the request in the header
        .post('/api/items', item, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

};

//adding add loading action
export const setItemsLoading = () => {
    return {
        //return to the reducer the type which is ITEMS_LOADING
        type: ITEMS_LOADING,
    };
};

//adding delete item action AND it needs an id because it needs to know the item to delete
export const deleteItem = (id) => (dispatch, getState) => {
    axios.delete(`/api/items/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_ITEM,
                payload: id
            })
        ).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

};

