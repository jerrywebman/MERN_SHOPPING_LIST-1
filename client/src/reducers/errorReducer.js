import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState ={
    //these data comes from the server
    msg: {},
    status: null,
    id: null
}
export default function (state = initialState, action){//the action here is the action that comes from the actionsfile
    switch(action.type){
        case GET_ERRORS:
        return{
            msg: action.payload.msg,
            status: action.payload,
            id: action.payload.id
        };
        case CLEAR_ERRORS:
        return{
            //we set everything to empty
            msg: {},
            status: null,
            id:null
        };
        default: return state;
    }
}