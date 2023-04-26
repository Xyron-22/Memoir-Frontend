import {AUTH, ERROR} from "../constants/actionTypes"//
import * as api from '../api/index';

export const signIn = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        if (data.message === "User does not exist" || data.message === "Invalid Credentials") {//
            dispatch({type: ERROR, data})
        } else {
            dispatch( { type: AUTH, data});
           
            history("/");
        }
    } catch (error) {
        console.log(error);
    }
};

export const signUp = (formData, history) => async (dispatch) => {
    try {       
        const {data} = await api.signUp(formData);
        if(data.message === "User already exist" || data.message === "Password does not match") {
            dispatch({type: ERROR, data})
        } else {
            dispatch({type: AUTH, data})
            
            history("/");
        }  
    } catch (error) {
        console.log(error);
    }
};



