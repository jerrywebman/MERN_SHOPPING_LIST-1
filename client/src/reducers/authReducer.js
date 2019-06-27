import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),// getting the token from the local storage
    isAuthenticated: null,
    isLoading: false,
    user: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,//current state
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,// current state
                isAuthenticated: true,
                isLoading: false,
                user: action.payload//sending the user as the payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS://on both cases we do the below
            localStorage.setItem('token', action.payload.token);//set the token to localstorage
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:// on all 4 we the below
            localStorage.removeItem('token');//clear the token from the local storage if any of thses above cases occur    
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default: return state;
    }
}