import React, { useState } from "react";
import "../../../Utils/style.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


function PriceComponents(props) {

  return (
    <div className="category-section experience-with-us">
      <div className="container">
        <h2 className="heading">Start your experience with us</h2>
        <p className="description">
          Access relaxing sounds different guided meditations, relaxation and yoga.
        </p>

        <div className="main-plan-section">
          <div className="row">
            <div className="col-md-4">
              <div className="plan-box">
                <h3>Around</h3>
                <h4>Get 10 days per month</h4>
                <h5>$109 <span>/per month</span></h5>
                <p>
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis.
                </p>
                <button className="get-started">Get Started</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="plan-box">
                <h3>Freedom</h3>
                <h4>Get 20 days per month</h4>
                <h5>$120 <span>/per month</span></h5>
                <p>
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis.
                </p>
                <button className="get-started">Get Started</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="plan-box">
                <h3>Fire</h3>
                <h4>Get 30 days per month</h4>
                <h5>$159 <span>/per month</span></h5>
                <p>
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis.
                </p>
                <button className="get-started">Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceComponents;
