import * as types from "./bookTypes";
import axios from 'axios';
import * as api from './BookAPI';

export const saveBook = (book) => {

    return dispatch => {
        dispatch(saveBookRequest());
        axios.post(api.SAVE_BOOK, book)
            .then(response => {
                dispatch(bookSuccess(response.data))
            })
            .catch(err => {
                dispatch(bookFailure(err));
            })
    };

};

const saveBookRequest = () => {

    return {
        type: types.SAVE_BOOK_REQUEST
    };

};

const updateBookRequest = () => {

    return {
        type: types.UPDATE_BOOK_REQUEST
    };

};

export const updateBook = (book) => {

    return dispatch => {
        dispatch(updateBookRequest());
        axios.put(api.UPDATE_BOOK, book)
            .then(response => {
                dispatch(bookSuccess(response.data))
            })
            .catch(err => {
                dispatch(bookFailure(err));
            })
    };

};



const fetchBookRequest = () => {

    return {
        type: types.FETCH_BOOK_REQUEST
    };

};

export const fetchBook = (bookId) => {

    return dispatch => {
        dispatch(fetchBookRequest());
        axios.get(api.GET_BOOK_BY_ID + bookId)
            .then(response => {
                dispatch(bookSuccess(response.data))
                console.log("ActionBook: "+response.data);
            })
            .catch(err => {
                dispatch(bookFailure(err));
            })
    };

};

const deleteBookRequest = () => {
    return {
        type: types.DELETE_BOOK_REQUEST
    };
}

export const deleteBook = bookId => {
    return dispatch => {
        dispatch(deleteBookRequest());
        axios.delete(api.DELETE_BOOK + bookId)
            .then(response => {
                dispatch(bookSuccess(response.data));
            })
            .catch(error => {
                dispatch(bookFailure(error));
            })
    };
};


const bookSuccess = (book) => {

    return {
        type: types.BOOK_SUCCESS,
        payload: book
    };

};

const bookFailure = (error) => {

    return {
        type: types.BOOK_FAILURE,
        payload: error
    };

};