import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../../Utils/css/bootstrap.min.css";
import "./index.css"

export default function Sidemenu({active}) {
  return (
    <div className="col-lg-3">
      <div className="dashboard-menu">
        <ul>
          <li>
            <Link to="profile" className="menu1 active">
              My Profile
            </Link>
          </li>
          <li>
            <Link to="" className="menu2">
              My Subscriptions
            </Link>
          </li>
          <li>
            <Link to="" className="menu3">
              My Courses
            </Link>
          </li>
          <li>
            <Link to="" className="menu4">
              My Playlists
            </Link>
          </li>
          <li>
            <Link to="" className="menu5">
              My Favourite
            </Link>
          </li>
          <li>
            <Link to="" className="menu6">
              Recently Watched
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
