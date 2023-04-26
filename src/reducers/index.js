import {combineReducers} from 'redux';
import posts from './posts';
import reducer from './auth';


export const reducers = combineReducers({
    posts: posts,
    reducer: reducer
});