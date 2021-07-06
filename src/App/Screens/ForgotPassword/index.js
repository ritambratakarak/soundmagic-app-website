import React, { useState } from "react";
import "../../Utils/style.css";
import "../Login/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./../../images/Logo.png";
import loginBg from "./../../images/login-bg.png";

function Forgotpassword(props) {
  return (
    <div className="login-page">
      <div className="login-page-inner">
        <div className="login-inner-left">
          <div className="login-logo">
            <a href="#">
              <img src={logo} alt="" />
            </a>
          </div>
          <div className="login-banner-bg">
            <img src={loginBg} alt="" />
          </div>
        </div>
        <div className="login-inner-right">
          <div className="login-form">
            <h2>Forgot Password</h2>
            <div class="login-form-field">
              <input type="text" placeholder="Email" class="input-field" />
            </div>

            <div class="login-button-set">
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgotpassword;
