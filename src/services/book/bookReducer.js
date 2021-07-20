
import * as types from "./bookTypes";

const initialState = {
    book: '',
    error: ''
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SAVE_BOOK_REQUEST || types.UPDATE_BOOK_REQUEST || types.FETCH_BOOK_REQUEST || types.DELETE_BOOK_REQUEST:
            return {
                ...state
            };

        case types.BOOK_SUCCESS:
            return {
                book: action.payload,
                error: ''
            };
        case types.BOOK_FAILURE:
            return {
                book: '',
                error: action.payload
            };
        default: return state;

    }

};

export default reducer;