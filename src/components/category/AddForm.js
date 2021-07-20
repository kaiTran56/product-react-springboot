import React, { Component } from 'react';
import { saveCategory } from '../../services/index';
import { connect } from 'react-redux';

class AddForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    onSubmit = event => {
        event.preventDefault();
    }

    onChange = (event) => {
        let target = event.target;
        let value = target.value;
        this.setState({
            name: value
        })
    }

    onClick = () => {
        let { name } = this.state;
        const category = {
            name: name,
        }

        this.props.saveCategory(category);
        setTimeout(() => {
            if (this.props.saveCategoryObject.category != null) {

                setTimeout(() => alert("Success!"), 1000);
            } else {
                alert("Sorry not saved cate! ");
            }
        }, 100);
        this.setState({
            name: ' '
        })
    }


    render() {
        return (

            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label >Category</label>
                    <input type="text" name="name" className="form-control" id="inputAddress" placeholder="input" onChange={this.onChange} />
                </div>
                <button type="submit" className="btn btn-primary" value={this.state.name} onClick={this.onClick}>Save</button>
            </form>

        );
    }

}

const mapStateToProps = state => {
    return {
        saveCategoryObject: state.category
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveCategory: (category) => dispatch(saveCategory(category))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);