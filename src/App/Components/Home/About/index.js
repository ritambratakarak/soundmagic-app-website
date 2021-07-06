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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis.
                </p>
                <p>
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis.
                </p>
                <button className="know-more">Know More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutComponents;
