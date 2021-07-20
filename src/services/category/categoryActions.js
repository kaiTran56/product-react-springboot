import * as types from "./categoryTypes";
import axios from 'axios';
import * as api from './CategoryAPI';

const categorySuccess = (category) => {
    return {
        type: types.CATEGORY_SUCCESS,
        payload: category
    }
};
const categoryFailure = error => {
    return {
        type: types.CATEGORY_FAILURE,
        payload: error
    }
};

const saveCategoryRequest = () => {
    return {
        type: types.SAVE_CATEGORY
    }
};

const updateCategoryRequest = () => {
    return {
        type: types.UPDATE_CATEGORY
    }
};

const getAllCategoryRequest = () => {
    return {
        type: types.GET_ALL_CATEGORY
    }
};

const getCategoryByIdRequest = () => {
    return {
        type: types.GET_CATEGORY_BY_ID
    }
};

const deleteCategoryRequest = () => {
    return {
        type: types.DELETE_CATEGORY
    }
};

export const saveCategory = category => {
    return dispatch => {
        dispatch(saveCategoryRequest());
        axios.post(api.SAVE_CATEGORY, category)
            .then(response => {
                dispatch(categorySuccess(response.data))
            })
            .catch(err => {
                dispatch(categoryFailure(err))
            })
            ;
    }
}

export const getAllCategory = () => {
    return dispatch => {
        dispatch(getAllCategoryRequest());
        axios.get(api.GET_ALL_CATEGORY)
            .then(response => {
                dispatch(categorySuccess(response.data));
                console.log("Action: "+response.data);
            })
            .catch(err => {
                dispatch(categoryFailure(err))
            })
    }
}

export const getCategoryById = (categoryId) => {
    return dispatch => {
        dispatch(getCategoryByIdRequest());
        axios.get(api.GET_CATEGORY_BY_ID + categoryId)
            .then(response => {
                dispatch(categorySuccess(response.data))
            })
            .catch(err => {
                dispatch(categoryFailure(err))
            })
    }
}

export const updateCategory = category => {
    return dispatch => {
        dispatch(updateCategoryRequest());
        axios.put(api.UPDATE_CATEGORY, category)
            .then(response => {
                dispatch(categorySuccess(response.data));
                
            })
            .catch(err => {
                dispatch(categoryFailure(err))
            })
    }
}

export const deleteCategory = categoryId => {
    return dispatch => {
        dispatch(deleteCategoryRequest());
        axios.delete(api.DELETE_CATEGORY + categoryId)
            .then(response => {
                dispatch(categorySuccess(response.data))
            })
            .catch(err => {
                dispatch(categoryFailure(err))
            })
    }
}