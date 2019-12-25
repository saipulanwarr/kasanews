import axios from 'axios';
import { ADD_CATEGORY, GET_ERRORS, CLEAR_ERRORS, CATEGORY_LOADING, GET_CATEGORIES, GET_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from './types';

export const addCategory = categoryData => dispatch => {
    dispatch(clearErrors());
    axios
        .post('http://localhost:5000/api/category', categoryData)
        .then(res => {
            dispatch({
                type: ADD_CATEGORY,
                payload: res.data.data
            })
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.message
            })
        );
}

export const updateCategory = (id, categoryData) => dispatch => {
    dispatch(clearErrors());
    axios
        .put(`http://localhost:5000/api/category/${id}`, categoryData)
        .then(res => {
            dispatch({
                type: UPDATE_CATEGORY,
                payload: res.data.data
            })
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.message
            })    
        )
}

export const getCategories = () => dispatch => {
    dispatch(setCategoryLoading());
    axios
        .get('http://localhost:5000/api/category')
        .then(res =>
            dispatch({
                type: GET_CATEGORIES,
                payload: res.data.data
            }) 
        )
        .catch(errr => 
            dispatch({
                type: GET_CATEGORIES,
                payload: null
            })    
        )
}

export const getCategory = id => dispatch => {
    dispatch(clearErrors());
    dispatch(setCategoryLoading());
    axios
        .get(`http://localhost:5000/api/category/${id}`)
        .then(res =>
            dispatch({
                type: GET_CATEGORY,
                payload: res.data.data
            }) 
        )
        .catch(err => 
            dispatch({
                type: GET_CATEGORY,
                payload: null
            })    
        )
}

export const deleteCategory = id => dispatch => {
    axios
        .delete(`http://localhost:5000/api/category/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_CATEGORY,
                payload: id
            })    
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.message
            }) 
        );
};

export const setCategoryLoading = () => {
    return {
        type: CATEGORY_LOADING
    };
}

export const clearErrors = () => {
    return{
        type: CLEAR_ERRORS
    }
}