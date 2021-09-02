import React, { useState } from "react";
import "../../../Utils/style.css";
import "./about.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import about from './../../../images/about-bg.png';


function AboutComponents(props) {

  return (
    <div className="about-section">
      <img src={about} alt="" />
      <div className="about-text">
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-lg-12 col-xl-7">
              <div className="about-text-inner">
                <h2>About Us</h2>
                <h3>
                  Take your Yoga to the next<br />
                  level with us
                </h3>
                <p>
                    People behind the app are long-term meditators and sound
                    practitioners who wanted to share their experience with
                    others, and open space for others to share their insights.
                    
                  </p>
                  
                <button className="know-more" onClick={props.click}>Know More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutComponents;
