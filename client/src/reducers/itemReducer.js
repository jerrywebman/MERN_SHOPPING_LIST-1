import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from '../actions/types'


const initialState = {
    items: [ ]
}

export default function( state = initialState, action){
    switch(action.type){
        case GET_ITEMS:
        return{
            //using spread to return the static objects in the db
            ...state,
            items: action.payload,
            loading: false
        };

        case DELETE_ITEM:
        return{
            ...state,
            items: state.items.filter(item => item._id != action.payload)
        };

        case ADD_ITEM:
        return{
            ...state,
            //action.payload is the new item that comes in
            items: [action.payload, ...state.items]
        };
        case ITEMS_LOADING:
        return{
            ...state, //we want the initial state and change loading to true
            loading: true
        };
        default:
            return state;
    }
}