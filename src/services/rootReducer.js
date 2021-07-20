import { combineReducers } from "redux";
import bookReducer from './book/bookReducer';
import categoryReducer from './category/categoryReducer';

const rootReducer = combineReducers({
    book: bookReducer,
    category: categoryReducer
});

export default rootReducer;