import React, { useState } from "react";
import "../../../Utils/style.css";
import "../Banner/banner.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import banner from '../../../images/banner.png';


function BannerComponents(props) {

  return (
    <div className="banner">
      <img src={banner} alt="" />
      <div className="banner-text">
        <div className="container">
          <div className="banner-text-inner">
            <h2>Change Your Life</h2>
            <h3>By Meditation</h3>
            <p>
              We are the most popular yoga studio in town. Rated by more than
              1000+ customers
            </p>
            <button className="enroll-now">Enroll Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerComponents;
