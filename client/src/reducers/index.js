import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import tagListsReducer from './tagListsReducer';

// combines the reducers to create the full state
export default combineReducers({
    // auth piece of state is produced by authReducer
    auth: authReducer,
    form: reduxForm,
    tagLists: tagListsReducer
});