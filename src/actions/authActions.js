import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { SET_CURRENT_USER, GET_ERRORS } from './types';

//Login - Get User Token
export const loginUser = userData => dispatch => {
    axios
        .post('http://localhost:5000/api/auth', userData)
        .then(res => {
            const token = res.data.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decode = jwt_decode(token);
            dispatch(setCurrentUser(decode));
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.message
            })
        );
};

export const setCurrentUser = decode => {
    return {
        type: SET_CURRENT_USER,
        payload: decode
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}