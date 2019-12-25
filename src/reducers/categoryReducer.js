import {
    ADD_CATEGORY,
    CATEGORY_LOADING,
    GET_CATEGORIES,
    GET_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY
} from '../actions/types';

const initialState = {
    categories: [],
    category: {},
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case CATEGORY_LOADING:
            return{
                ...state,
                loading: true
            }
        case GET_CATEGORIES:
            return{
                ...state,
                categories: action.payload,
                loading: false
            };
        case GET_CATEGORY:
            return{
                ...state,
                category: action.payload,
                loading: false
            };
        case ADD_CATEGORY:
            return {
                ...state,
                category: [action.payload, ...state.categories]
            };
        case UPDATE_CATEGORY:
            const newCategory = state.categories.map(category => {
                if(category.categoryId === action.payload.categoryId){
                    return action.payload;
                }

                return category;
            })
            
            return{
                ...state,
                categories: newCategory
            };
        case DELETE_CATEGORY:
            return{
                ...state,
                categories: state.categories.filter(category => category.categoryId !== action.payload)
            };
        default: 
            return state;
    }
}

