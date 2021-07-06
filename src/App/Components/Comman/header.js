import React, { useState } from "react";
import "../../Utils/style.css";
import "./../../Utils/css/header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Logo from "./../../images/Logo.png";
import Search from "./../../images/header-search.png";
import usersearch from "./../../images/header-account.png";

function HeaderComponents({show, onClick}) {


  return (
    <div className="header">
      <div className="container">
        <div className="header-inner">
          <div className="logo">
          <Link to="/" className="nav-link">
              <img src={Logo} alt="" />
          </Link>
          </div>
          <div className="header-right">
            <div className="navigation">
              <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top fixed-top">
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
                      <Link to="/login" className="nav-link">Home</Link>
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
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search"
                />
                <button className="search-btn">
                  <img src={Search} alt="" />
                </button>
              </div>

              <div
                className="header-account dropdown-toggle"
                 aria-haspopup="true"
                aria-expanded="false"
                // data-toggle="dropdown"
                onClick={onClick}
                >
                <img src={usersearch} alt="" />
                <div
                  className={show ? "dropdown-menu dropdown-menu-right show dropdown-position" : "dropdown-menu dropdown-menu-right"}>
                  <Link to="/login" className="dropdown-item">Login</Link>
                  <Link to="/signup" className="dropdown-item">Sign up</Link>
                  <Link to="/forgotpassword" className="dropdown-item">Forgot Password</Link>
                  {/* <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Separated link
                  </a> */}
                </div>
              </div>

              {/* <button
                type="button"
                class="btn btn-danger dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Action
              </button> */}
              {/* <div class="dropdown-menu">
                <a class="dropdown-item" href="#">
                  Action
                </a>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">
                  Separated link
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderComponents;
