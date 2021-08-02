import React, { Component } from "react";
import axios from "axios";
import './news.css';
import ReactHtmlParser from 'react-html-parser';
import { Link } from "react-router-dom";


class NewsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listResult: [],
            news: '',
            currentPage: 1,
            newsPerPage: 6,
            totalElements: 0,
            totalPage: 0,
        }
    }

    componentDidMount() {
        this.getListBook(this.state.currentPage);
    }
   

    deleteBook = (id) => {
        axios.delete("http://localhost:8080/api/news/delete/" + id)
            .then(response => response.data)
            .then(res => {
                alert("Delete successfully!");
                this.componentDidMount();
            })
            .catch(err => {
                console.log(err);
            });
    }



    onClickDelete = (id) => {
        if (id !== null) {
            this.deleteBook(id);
        }
    }

    getListBook = (page) => {
        let { newsPerPage } = this.state;
        axios.get("http://localhost:8080/api/news?page=" + page + "&limit=" + newsPerPage)
            .then(response => response.data)
            .then(res => {
                this.setState({
                    listResult: res.listResult,
                });
                console.log(res.listResult);
            })
            .catch(err => {
                console.log(err);
            });
    }

    getNewsById = (id) => {
        axios.get("http://localhost:8080/api/news/" + id)
            .then(response => response.data)
            .then(res => {
                console.log(res);
                this.setState({
                    news: res,
                })

            })
            .catch(err => alert(err));
    }

    onClickGetNews = (id) => {
        this.getNewsById(id);
    }

    render() {
        let { listResult, news } = this.state;
        
        let element = listResult.map((news, index) => {
            return (
                <tr className="d-flex" key={index}>
                    <td className="col-1 text-center">{index + 1}</td>
                    <th className="col-2 text-center">
                        <img src={news.thumbnail}
                            class="set-size-img" />
                    </th>
                    <th className="col-6 label label-info"> {news.title}

                    </th>
                    <th className="col-3 text-center">                       
                        <Link to={"/news/edit/" + news.id} className="btn btn-success">Edit</Link>
                        {'   '}
                        <button type="button" class="btn btn-danger" onClick={this.onClickDelete.bind(this, news.id)}>Remove</button>{' '}
                        <button type="button" class="btn btn-info" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={this.onClickGetNews.bind(this, news.id)}>Detail</button>
                    </th>
                </tr>
            );
        })
        return (
            <div>
                <table class="table table-bordered table-dark">
                    <thead class="thead-inverse text-center">
                        <tr className="d-flex">
                            <th className="col-1">ID</th>
                            <th className="col-2">Thumbnail</th>
                            <th className="col-6">Title</th>
                            <th className="col-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {element}
                    </tbody>
                </table>
                <hr />
                {/* <div>{temp}</div>
                 */}
                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="row">
                                <div class="col-xs-1-12">
                                    <div class="card">
                                        <div class="card-header ">
                                            <h3 class="card-title text-center">{ReactHtmlParser(news.title)}</h3>
                                            <p class="card-text blockquote-footer">{ReactHtmlParser(news.modifiedDate)}</p>
                                            <p class="card-text">{ReactHtmlParser(news.description)}</p><br />
                                            <img src={news.thumbnail} class="set-size-img-large-detail text-center" alt="" />
                                        </div>
                                        <div class="card-body">
                                            <p class="card-text">{ReactHtmlParser(news.content)}</p>
                                        </div>
                                        <div class="card-footer row">
                                            <p class="card-text col-12 text-monospace">Topic: {ReactHtmlParser(news.topic)}</p>
                                            <p class="card-text col-8">Tags: {ReactHtmlParser(news.tagList)}</p>
                                            <p class="card-text col-4">Author: {ReactHtmlParser(news.modifiedBy)}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default NewsTable;