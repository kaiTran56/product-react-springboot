import React, { Component } from "react";
import axios from "axios";
import './news.css';
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


class NewsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listResult: [],
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

    render() {
        let { listResult } = this.state;
        // let temp = listResult.map((news, index) => {
        //     if (index === 2) {
        //         return (<div key={index}>
        //             {ReactHtmlParser(news.content)}
        //         </div>);                
        //     }
        // });
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
                        <button type="button" class="btn btn-success">Edit</button>{'   '}
                        <button type="button" class="btn btn-danger" onClick={this.onClickDelete.bind(this, news.id)}>Remove</button>{' '}
                        <button type="button" class="btn btn-info">Detail</button>
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
            </div>
        );
    }
}
export default NewsTable;