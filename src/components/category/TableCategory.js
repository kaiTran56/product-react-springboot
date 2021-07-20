import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAllCategory, getCategoryById, deleteCategory, updateCategory } from '../../services/index';
import * as types from '../../constants/ConstantValue';


class TableCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameCategory: '',
            listCategory: [],
            categoryObj: {
                id: '',
                createdDate: '',
                modifiedDate: '',
                createdBy: '',
                modifiedBy: '',
                name: ''
            }
        }
    }

    componentDidMount() {
        this.getListCategory();
    }

    getListCategory() {
        this.props.getAllCategory();
        setTimeout(() => {
            let categories = this.props.categoryObject.category.listResult;
            this.setState({
                listCategory: categories
            });

        }, 1000);
    }


    getCateById = (categoryId) => {
        console.log(categoryId);
        this.props.getCategoryById(categoryId);

        setTimeout(() => {
            let cate = this.props.categoryByIdObj.category;
            console.log(cate);
            this.setState({
                categoryObj: {
                    id: cate.id,
                    createdDate: cate.createdDate,
                    modifiedDate: cate.modifiedDate,
                    createdBy: cate.createdBy,
                    modifiedBy: cate.modifiedBy,
                    name: cate.name
                }
            });
        }, 1000);

    }

    getCategory = (id) => {
        console.log(id);
        this.getCateById(id);
    }

    editCategory = () => {

        let { categoryObj, nameCategory } = this.state;
        if (nameCategory && nameCategory !== '' && nameCategory !== null && nameCategory !== ' ') {
            const category = {
                id: categoryObj.id,
                name: nameCategory
            }
            console.log(category);
            this.props.updateCategory(category);
            let temp = this.props.updateCategoryObj.category;
            setTimeout(() => {
                if (temp) {
                    this.closeModal();
                    this.componentDidMount();
                } else {
                    alert("Delete Faild!!");
                }
            }, 1000);
        } else {
            alert('Nothing to change!');
        }
        this.setState({
            nameCategory: '',
            categoryObj: {
                createdDate: '',
                modifiedDate: '',
                createdBy: '',
                modifiedBy: '',
                name: ''
            },
        })
    }

    handleChange = (event) => {
        this.setState({
            nameCategory: event.target.value,
        });
    }

    deleteCategory = (id) => {
        this.props.deleteCategory(id);
        setTimeout(() => {
            if (id !== null) {
                alert("Delete Successfully!");
                this.componentDidMount();
            } else {
                alert("Delete Faild!!");
            }
        }, 1000);

    }

    closeModal = () => {
        this.setState({
            categoryObj: {
                createdDate: '',
                modifiedDate: '',
                createdBy: '',
                modifiedBy: '',
                name: ''
            }
        });
    }


    render() {
        let { categoryObj } = this.state;
        let { listCategory } = this.state;
        let element = null;
        if (listCategory) {
            element = listCategory.map((cate, index) => {
                return (
                    <tr className="d-flex" key={index}>
                        <th className="col-1">{index + 1}</th>
                        <td className="col-8">{cate.name}</td>
                        <td className="col-3">
                            <button type="button" class="btn btn-success" onClick={this.getCategory.bind(this, cate.id)} data-toggle="modal" data-target="#editCategory" disabled={cate.name === types.NO_TOPIC ? true : false}>Edit</button>{'   '}
                            <button type="button" class="btn btn-danger" disabled={cate.name === 'No Topic' ? true : false} onClick={this.deleteCategory.bind(this, cate.id)}>Remove</button>
                        </td>
                    </tr>
                );
            });
        }

        return (



            <div>
                <div class="modal fade" id="editCategory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Category</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="inputEmail4">Created Date</label>
                                            <input type="text" class="form-control" id="inputEmail4" value={categoryObj.createdDate} disabled />
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="inputPassword4">Modified Date</label>
                                            <input type="text" class="form-control" id="inputPassword4" value={categoryObj.modifiedDate} disabled />
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="inputCity">Created By</label>
                                            <input type="text" class="form-control" id="inputCity" value={categoryObj.createdBy} disabled />
                                        </div>

                                        <div class="form-group col-md-6">
                                            <label for="inputZip">Modified By</label>
                                            <input type="text" class="form-control" id="inputZip" value={categoryObj.modifiedBy} disabled />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputAddress">Category</label>
                                        <input type="text" class="form-control text-dark" name="nameCategory" requied
                                            value={this.state.nameCategory}
                                            onChange={this.handleChange} placeholder={categoryObj.name}
                                            id="category"
                                        />
                                    </div>

                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>Close</button>
                                <button type="button" class="btn btn-primary" onClick={this.editCategory}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                <table class="table table-bordered table-dark">
                    <thead>
                        <tr className="d-flex">
                            <th className="col-1">#</th>
                            <th className="col-8">Name</th>
                            <th className="col-3" >Action</th>

                        </tr>
                    </thead>
                    <tbody>

                        {element}

                    </tbody>
                </table>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        categoryObject: state.category,
        categoryByIdObj: state.category,
        deleteCategoryObj: state.category,
        updateCategoryObj: state.category,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllCategory: () => dispatch(getAllCategory()),
        getCategoryById: (categoryId) => dispatch(getCategoryById(categoryId)),
        deleteCategory: (categoryId) => dispatch(deleteCategory(categoryId)),
        updateCategory: categgory => dispatch(updateCategory(categgory)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableCategory);