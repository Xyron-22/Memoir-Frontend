import { AUTH, LOGOUT, ERROR} from "../constants/actionTypes";


const authReducer = (state = {authData: null}, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem("profile", JSON.stringify(action.data));
            return {authData: action.data};
        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null};
        case ERROR:
            return {authData: action.data}//
        default:
            return state;
    }
}

export default authReducer;