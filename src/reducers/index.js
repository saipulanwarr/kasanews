import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    category: categoryReducer
});