import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
    //these data comes from the server
    msg: {},
    status: null,
    id: null
}
export default function (state = initialState, action) {//the action here is the action that comes from the actionsfile
    switch (action.type) {
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            };
        case CLEAR_ERRORS:
            return {
                //we set everything to empty. so the old error will not be hanging in our state
                msg: {},
                status: null,
                id: null
            };
        default: return state;
    }
}