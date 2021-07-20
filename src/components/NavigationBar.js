import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as typesBook from "../constants/UrlBookConstant";
import * as typesCategory from "../constants/UrlCategoryConstant";

export default class NavigationBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to={""}><a className="navbar-brand" >BookStore</a></Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle active" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Book
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link to={typesBook.URL_LIST_BOOK} className="dropdown-item">List Book</Link>

                                <Link to={typesBook.URL_ADD_BOOK} className="dropdown-item" >Add Book</Link>

                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" >Here</a>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle active" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Category
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                                <Link to={typesCategory.URL_LIST_CATEGORY} className="dropdown-item">List Category</Link>
                               
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" >Here</a>
                            </div>
                        </li>

                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>

        );
    }
}