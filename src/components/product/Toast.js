import React, { Component } from 'react';
import "./../../App.css";

export default class Toast extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    showToast = () => {
        var { open } = this.state;
        this.setState({
            open: !open
        })
        this.props.showToast(this.state.open);
    }

    render() {
        return (
            <div aria-live="polite" aria-atomic="true"
                className="d-flex align-items-center position-Toast bg-light position-Toast-size border border-success bg-success text-black" >


                <div className="toast-header">

                    <small>{new Date().toDateString()}</small>
                    <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick={this.showToast}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="toast-body background-toast">
                    Hello, world! This is a toast message.
                </div>

            </div>
        );
    }
}