import React, { useState } from "react";
import "../../Utils/style.css";
import "./../../Utils/css/header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Logo from './../../images/Logo.png';
import Search from './../../images/header-search.png';
import usersearch from './../../images/header-account.png';


function HeaderComponents(props) {

  return (
    <div className="header">
      <div className="container">
        <div className="header-inner">
          <div className="logo">
            <a href="#">
              <img src={Logo} alt="" />
            </a>
          </div>
          <div className="header-right">
            <div className="navigation">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                      <a className="nav-link" href="#">
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Courses
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Track
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        About Us
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div className="search-account">
              <div className="header-search">
                <input type="text" className="search-input" placeholder="Search" />
                <button className="search-btn">
                  <img src={Search} alt="" />
                </button>
              </div>
              <div className="header-account">
                <img src={usersearch} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderComponents;
