import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('http://localhost:5000/api/auth')
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data.data
            })
        ).catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            }) 
        );
};

export const setProfileLoading = () => {
    return{
        type: PROFILE_LOADING
    };
};

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};