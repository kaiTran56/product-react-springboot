import React, { Component } from "react";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Book from "./components/product/Book";
import BookList from "./components/product/BookList";
import CategoryList from "./components/category/CategoryList";
import CKNote from "./components/ckeditor/CKNote";
import NewsList from "./components/news/NewsList";
import AddFormNews from "./components/news/AddFormNews";
import * as typesBook from "./constants/UrlBookConstant";
import * as typesCategory from "./constants/UrlCategoryConstant";
import * as typesUrlRest from "./constants/UrlRest";
import * as typesUrlNews from "./constants/UrlNews";

export default class App extends Component {
  render() {
    return (
      <Router>
        <NavigationBar></NavigationBar>
        <div class="container margin-top ">
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path={typesBook.URL_ADD_BOOK} exact component={Book} />
            <Route path={typesBook.URL_EDIT_BOOK} exact component={Book} />
            <Route path={typesBook.URL_LIST_BOOK} exact component={BookList} />
            <Route path={typesCategory.URL_LIST_CATEGORY} exact component={CategoryList} />
            {/* <Route path={typesUrlRest.TEST_CKEDITOR} exact component={CKNote} /> */}
            <Route path={typesUrlNews.URL_NEWS} exact component={NewsList} />
            <Route path={typesUrlNews.URL_ADD_NEWS} exact component={AddFormNews} />
            <Route path={typesUrlNews.URL_EDIT_NEWS} exact component={AddFormNews} />
          </Switch>
        </div>
      </Router>
    );
  }
}
