import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <footer class="footer font-small blue bg-light fixed-bottom">

                
                <div class="footer-copyright text-center py-3">{new Date().toDateString()} : 
                    <a >Tran Quyet</a>
                </div>
                

            </footer>
        );
    }
}