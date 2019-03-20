import { combineReducers } from "redux";
import { reducer as formReducer} from "redux-form";
import _ from "lodash";

const authReducer = (state = {
    isSignedIn: null,
    userId: null,
}, action) => {
    if( action.type === 'SIGN_IN' ) {
        return { ...state, isSignedIn: true, userId: action.payload }
    } else if(action.type === 'SIGN_OUT'){
        return { ...state, isSignedIn: false, userId: null}
    } else {
        return state;
    }
};

const streamReducer = (state={}, action) => {
    switch( action.type ){
        case "FETCH_STREAMS":
            return {...state, ..._.mapKeys(action.payload, 'id')}
        case "FETCH_STREAM":
            return {...state, [action.payload.id]: action.payload}
        case "EDIT_STREAM":
            return {...state, [action.payload.id]: action.payload}
        case "CREATE_STREAM":
            return {...state, [action.payload.id]: action.payload}
        case "DELETE_STREAM":
            return _.omit(state, action.payload)
        default:
            return state;
    }
}

const reducers = combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamReducer
});

export default reducers;