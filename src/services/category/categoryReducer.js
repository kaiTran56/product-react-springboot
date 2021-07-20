import * as types from './categoryTypes';

const initialState = {
    category: '',
    error: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_CATEGORY || types.UPDATE_CATEGORY || types.GET_CATEGORY_BY_ID || types.SAVE_CATEGORY:
            return {
                ...state
            };

        case types.CATEGORY_SUCCESS:
            return {
                category: action.payload,
                error: ''
            }

        case types.CATEGORY_FAILURE:
            return {
                category: '',
                error: action.payload
            }
        default:
            return state
    }
}

export default reducer;