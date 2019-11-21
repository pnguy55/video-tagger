import { combineReducers } from 'redux';
import authReducer from './authReducer';

// combines the reducers to create the full state
export default combineReducers({
    // auth piece of state is produced by authReducer
    auth: authReducer
});