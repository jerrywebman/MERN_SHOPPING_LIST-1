import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';


//check token and load user
//along with dispatch we pass in our state
export const loadUser = () => (dispatch, getState) => {
    //passing the user loading// this changes the loading value from false to true
    dispatch({ type: USER_LOADING });

    //fetch the user using axios
    axios.get('api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

//register User
export const register = ({ name, email, password }) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //request body is the data we want to send
    const body = JSON.stringify({ name, email, password });
    axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            });
        });
};

//login user
export const login = ({ email, password }) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //request body is the data we want to send
    const body = JSON.stringify({ email, password });
    axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });
};



//logout User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

//setup config/headers and token

export const tokenConfig = getState => {
    // get token from local storage from the authReducer.js
    const token = getState().auth.token;

    //add the getState to the headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    // if there is a token then add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}
