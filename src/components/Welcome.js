import React, { Component } from "react";
import imageTemp from "./../img/123.jpg";
import imageTemp1 from "./../img/plain.jpg";

export default class Welcome extends Component {
    render() {
        return (

            <div class="card row">

                <div class="card-body col text-center">


                    <div id="carouselId" class="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselId" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselId" data-slide-to="1"></li>
                            <li data-target="#carouselId" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner resize-image" role="listbox">
                            <div className="carousel-item active ">
                                <img src={imageTemp} alt="First slide" />
                            </div>
                            <div className="carousel-item">
                                <img src={imageTemp1} alt="Second slide" />
                            </div>
                            <div className="carousel-item">
                                <img src={imageTemp} alt="Third slide" />
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselId" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselId" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>

                    <br />

                </div>


            </div>



        );
    }
}
