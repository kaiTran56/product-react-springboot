import React, { Component } from 'react';
import TableCategory from './TableCategory';
import AddForm from './AddForm';

class CategoryList extends Component {

    constructor(props){
        super(props);
        this.state={
            tranferForm: true
        };
    }

    openListForm = () => {
        this.setState({
            tranferForm: true
        });
    }
    openAddForm =()=>{
        this.setState({
            tranferForm: false
        })
    }

    render() {
        let {tranferForm} = this.state;
        return (
            <div>
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title text-center">CATEGORY</h4>
                    </div>
                </div>

                <div class="card text-center">
                    <div class="card-header bg-light">
                        <ul class="nav nav-tabs card-header-tabs">
                            <li class="nav-item">
                                <a class="nav-link text-white bg-primary btn-toolbar" onClick={this.openListForm}>Show Category</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white bg-secondary btn-toolbar" onClick={this.openAddForm}>Add Category</a>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body ">
                         {tranferForm === true ? <TableCategory></TableCategory> : <AddForm></AddForm>}
                        
                    </div>
                </div>
                
            </div>

        );
    }

}

export default CategoryList;