import React, { Component } from "react";
import "./news.css";
import NewsTable from "./NewsTable";
class NewsList extends Component {
    render() {
        return (

            <div>
                <div class="card">
                    <div className="card-header">
                        <h4 class="card-title text-center">Tran Quyet</h4>
                    </div>
                    <div class="card-body">
                        <NewsTable />
                    </div>
                    <div class="card-footer text-right">
                        
                        Tran Quyet
                    </div>
                </div>
            </div>


        );
    }
}

export default NewsList;