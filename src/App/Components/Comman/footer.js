import React, { useState } from "react";
import "../../Utils/style.css";
import "./../../Utils/css/footer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppStore from './../../images/app-store.png';
import GoogleStore from './../../images/google-store.png';
import fb from './../../images/fb.png';
import ins from './../../images/ins.svg';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";


function FooterComponents() {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-box quick-footer">
              <h4>QUICK LINKS</h4>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                {/* <li>
                  <Link to="#">Courses</Link>
                </li> */}
                <li>
                  <Link to="/track">Track</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="footer-box legal-footer">
              <h4>Legal</h4>
              <ul>
                <li>
                  <Link to="/terms">Terms & Conditions</Link>
                </li>
                <li>
                <Link to="/terms">Privacy Policy</Link>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
            </div>

            <div className="footer-box contact-footer">
              <h4>Contact</h4>
              <p className="location">
                Mindfulness Haven Drumsheel Lower, Cong, Co. Mayo Ireland
              </p>
              <p className="phone">+353 851 386537</p>
              <p className="email">contact@mindfulnesshaven.academy</p>
            </div>

            <div className="footer-box subcribe-footer">
              <h4>Subscribe</h4>
              <div className="subcription-section-footer">
                <input type="text" placeholder="Enter your email" />
                <button className="subcribe">Subscribe</button>
              </div>
              <div className="app-store">
                <a href="#">
                  <img src={AppStore} alt="" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.soundmagic" target="_blank">
                  <img src={GoogleStore} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copy-right-section">
        <div className="container">
          <div className="copy-right-section-inner">
            <p>
              © 2021 <a href="#">MindfulnessHaven</a>. All Rights Reserved.
            </p>
            <ul>
              <li>
                <a href="#">
                  <img src={fb} alt="" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={ins} alt="" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default FooterComponents;
