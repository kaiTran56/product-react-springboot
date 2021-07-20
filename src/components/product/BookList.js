import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteBook } from '../../services/index';

class BookList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            currentPage: 1,
            booksPerPage: 6,
            totalElements: 0,
            totalPage: 0,
            word: ''
        };

    }

    componentDidMount() {
        this.findAllBook(this.state.currentPage);
    }


    findAllBook = (currentPage) => {

        let { booksPerPage } = this.state;

        const URL = "http://localhost:8080/api/product?page=" + currentPage + "&limit=" + booksPerPage + "&sortBy=id";

        axios.get(URL)
            .then(response => response.data)
            .then(res => {
                console.log(res);
                this.setState({
                    books: res.listResult,
                    currentPage: res.currentPage,
                    booksPerPage: res.limit,
                    totalElements: res.totalItem,
                    totalPage: res.totalPage

                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    //redux
    deleteBook = (bookId) => {
        this.props.deleteBook(bookId);
        setTimeout(() => {
            if (bookId !== null) {
                alert("Delete Successfully!");
                this.componentDidMount();
            } else {
                alert("Delete Faild!!");
            }
        }, 1000);
        
    }

    decreasePageNumber = () => {

        var { currentPage } = this.state;
        let { word } = this.state;
        let prevPage = 1;
        if (currentPage > prevPage) {
            if (word) {

            } else {
                this.findAllBook(currentPage - prevPage);
            }
        }


    }

    increasePageNumber = () => {
        var { currentPage, totalPage } = this.state;
        let { word } = this.state;
        let nextPage = 1;
        if (currentPage < totalPage) {
            if (word) {

            } else {
                this.findAllBook(currentPage + nextPage);
            }

        }

    }

    onChange = (event) => {
        let target = event.target.value;
        if (target < this.state.totalPage && target > 0)
            this.findAllBook(target);

    }

    filterBook = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        let { currentPage } = this.state;
        this.setState({
            [name]: value
        })
        this.searchBook(value);
    }

    //http://localhost:8080/api/product/search?word=tran&page=1&limit=2&sortby=id
    searchBook = (word) => {
        if (word && word !== null && word !== '') {
            axios.get("http://localhost:8080/api/product/search?word=" + word)
                .then(response => response.data)
                .then(res => {
                    console.log(res);
                    this.setState({
                        books: res.listResult,



                    });
                })
                .catch(err => console.log(err));
        } else {
            this.findAllBook(this.state.currentPage);
        }

    }



    render() {

        var { books, currentPage, totalPage, totalElements } = this.state;

        var element = books.map((book, index) => {
            return (

                <tr key={index}>
                    <td scope="row">{index + 1}</td>
                    <td>{book.title}</td>
                    <td>{book.content}</td>
                    <td>{book.price}</td>
                    <td>
                        <Link to={"/book/edit/" + book.id} className="btn btn-success">Edit</Link>
                        {' '}
                        <button className="btn btn-danger" onClick={this.deleteBook.bind(this, book.id)}>Remove</button>
                    </td>
                </tr>


            );
        })

        var pagenation = totalPage ? (
            <div className="col-md-5 ">
                <nav aria-label="Page navigation">
                    <ul className="pagination">

                        <li className="page-item" onClick={this.decreasePageNumber}>
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>

                        <li className={currentPage === 1 ? "page-item active" : "page-item"} onClick={this.increasePageNumber}><a className="page-link" href="#">1</a></li>
                        <li className="page-item">
                            <input type="text" size="2" name="currentPage" className="form-control text-center active" placeholder={currentPage} onChange={this.onChange} min="1" />
                        </li>
                        <li className={currentPage === totalPage ? "page-item active" : "page-item"}><a className="page-link" href="#">{totalPage}</a></li>


                        <li className="page-item" onClick={this.increasePageNumber}>
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>

                    </ul>
                </nav>
            </div>

        ) : (' ');

        return (
            <div>
                <div className="card">

                    <div className="card-body  row">
                        <div className="col-6">

                        </div>
                        <div className="col-4">
                            <input type="text" name="word" id="input" className="form-control"
                                required="required" pattern="" title=""
                                onChange={this.filterBook}
                            />

                        </div>
                        <div className="col-2">
                            <button type="button" className="btn btn-primary">
                                Search
                            </button>
                        </div>

                    </div>
                </div>
                <div>
                    <table className="table bg-light">
                        <thead className="thead-inverse">
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {element}

                        </tbody>
                    </table>
                </div>
                <div className="card">

                    <div className="card-body  row">
                        <div className="col-md-4">
                            <h5 >Page: {currentPage}/{totalPage}</h5>
                        </div>
                        <div className="col-md-3">
                            <h5>Total Items: {totalElements}</h5>
                        </div>

                        {pagenation}


                    </div>
                </div>
            </div>



        );
    }
}

const mapStateToProps = state => {
    return {
        bookObject: state.book
    }
};

const mapDispatchToProps = dispatch => {
    return {
        deleteBook: (bookId) => dispatch(deleteBook(bookId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
