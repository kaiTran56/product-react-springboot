import React, { Component } from "react";
import Toast from "./Toast";

import { connect } from "react-redux";
import { saveBook, fetchBook, updateBook, getAllCategory } from '../../services/index';
class Book extends Component {

    constructor(props) {
        super(props);
        this.state = this.intialState;
        this.state.show = false;
        this.state.categoryList = [];
    }

    intialState = {
        id: null,
        title: "",
        content: "",
        price: 0,
        listImage: [],
        category: ''
    }

    componentDidMount() {
        const bookId = +this.props.match.params.id;


        if (bookId) {
            this.findBookById(bookId);
        }
        this.findCategory();

    }
    componentWillReceiveProps(props) {
        const bookId = props.match.params.id;
        // this.findCategory();
        if (!bookId) {
            this.setState({
                id: null,
                title: "",
                content: "",
                price: 0,
                listImage: [],
                category: ''
            });
        }
    }

    // redux
    findCategory() {
        this.props.getAllCategory();

        setTimeout(() => {
            let categories = this.props.categoryObject.category.listResult;
            this.setState({
                categoryList: categories
            });

        }, 100);

    }

    // redux --> need synchronize
    findBookById = (bookId) => {

        this.props.fetchBook(bookId);

        setTimeout(() => {
            let book = this.props.bookObject.book;
            if (book != null) {
                this.setState({
                    id: book.id,
                    title: book.title,
                    content: book.content,
                    price: book.price,
                    category: book.category,
                    listImage: book.listImage
                });
            }

        }, 500);

    }

    clearField = () => {
        this.setState(() => this.intialState);
    }

    onSubmit = (event) => {
        event.preventDefault();

    }

    onChange = (event) => {

        let target = event.target;
        let name = target.name;
        let value = target.value;

        this.setState({
            [name]: value
        });
    }

    //redux 
    onClick = () => {

        let { title, content, price, category, listImage } = this.state;
        if (title && content && category) {
            const book = {

                title: title,
                content: content,
                price: price,
                category: category,
                listImage: [listImage]
            }
            console.log(book);

            this.props.saveBook(book);

            setTimeout(() => {
                if (this.props.savedBookObject.book != null) {
                    this.setState({
                        show: true
                    })
                    setTimeout(() => this.setState({ show: false }), 3000);
                } else {
                    alert("Sorry not saved book! ");
                }
            }, 100);

            this.setState(this.intialState);
            this.findCategory();
        } else {
            console.log("Hey show nul");
        }



    }

    showToast = (open) => {
        this.setState({
            show: open
        });
    }

    // redux
    editBook = () => {
        const book = {
            id: this.state.id,
            title: this.state.title,
            content: this.state.content,
            price: this.state.price,
            category: this.state.category,
            listImage: [this.state.listImage]
        }

        this.props.updateBook(book);
        setTimeout(() => {
            if (this.props.updateBookObject.book != null) {
                this.setState({
                    show: true
                })
                setTimeout(() => this.setState({ show: false }), 3000);
            } else {
                alert("Sorry not saved book! ");
            }
        }, 100);

        this.setState(this.intialState);
        this.findCategory();
    }

    handleKey = event => {
        this.setState({
            listImage: event.target.value
        });
    }


    render() {

        let { show } = this.state;

        let { categoryList } = this.state;
        let elements = null;
        if (categoryList) {
            elements = categoryList.map((cate, index) => {
                if (cate) {
                    return (
                        <option key={index} value={cate.name} selected={this.state.category === cate.name ? true : false}>{cate.name}</option>
                    );
                }

            });
        }



        return (
            <div>
                <div>{show ? <Toast showToast={this.showToast}></Toast> : ""}</div>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title text-center">{this.state.id ? "Edit Book" : "ADD BOOK"}</h4>
                        <form className="row g-3 needs-validation" onSubmit={this.onSubmit} onReset={this.clearField}>
                            <div className="col-md-4">
                                <label for="validationCustom01" className="form-label">Author</label>
                                <input type="text" className="form-control" id="validationCustom01" value="Tran quyet" ></input>

                            </div>

                            <div className="col-md-8">
                                <label for="validationCustomUsername" className="form-label">Title</label>
                                <div className="input-group">

                                    <input type="text" className="form-control" name="title"
                                        value={this.state.title}
                                        onChange={this.onChange}
                                        id="validationCustomUsername"
                                        aria-describedby="inputGroupPrepend"
                                        required>

                                    </input>

                                </div>
                            </div>
                            <div className="col-md-12">
                                <label for="validationCustom02" className="form-label">Content</label>
                                <textarea class="form-control" name="content"
                                    value={this.state.content}
                                    onChange={this.onChange}
                                    id="" rows="3" resize="none"
                                    required>

                                </textarea>
                            </div>

                            <div class="input-group input-group-lg">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroup-sizing-lg"><img src={this.state.listImage} roundedRight
                                        width="40"
                                        height="38" /></span>
                                </div>
                                <input type="text" class="form-control" name="listImage" value={this.state.listImage}
                                    onChange={this.onChange} aria-label="Large" aria-describedby="inputGroup-sizing-sm" required />
                            </div>

                            <div className="col-md-6">
                                <label for="validationCustom03" className="form-label">Price</label>
                                <input type="number" className="form-control"
                                    name="price" value={this.state.price}
                                    onChange={this.onChange} id="validationCustom03" required ></input>

                            </div>
                            <div className="col-md-3">
                                <label for="validationCustom04" className="form-label">Language</label>
                                <select className="form-select" id="validationCustom04" name="category" onChange={this.onChange} required>
                                    <option selected="true" disabled>Choose...</option>

                                    {elements}
                                </select>

                            </div>
                            <div className="col-md-3">
                                <label for="validationCustom04" className="form-label">Category</label>
                                <select className="form-select" id="validationCustom04" >
                                    <option>Commic</option>
                                    <option>Science</option>
                                    <option>Funny</option>
                                </select>

                            </div>
                            <div className="col-12">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck" ></input>
                                    <label className="form-check-label" for="invalidCheck">
                                        Agree to terms and conditions
                                    </label>

                                </div>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary" type="submit" onClick={this.state.id ? this.editBook : this.onClick}>
                                    {this.state.id ? 'Edit' : 'Save'}
                                </button>{' '}
                                <button className="btn btn-success" onClick={this.clearField}>Clear</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



        );
    }
}

const mapStateToProps = state => {
    return {
        savedBookObject: state.book,
        bookObject: state.book,
        updateBookObject: state.book,
        categoryObject: state.category
    }
};

const mapDispatchToProps = dispatch => {
    return {
        saveBook: (book) => dispatch(saveBook(book)),
        fetchBook: (bookId) => dispatch(fetchBook(bookId)),
        updateBook: (book) => dispatch(updateBook(book)),
        getAllCategory: () => dispatch(getAllCategory())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);