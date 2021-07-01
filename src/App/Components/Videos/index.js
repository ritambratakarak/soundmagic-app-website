import React, { useState } from "react";
import "../../Utils/style.css";
import "../Videos/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import streach from './../../images/streach.png';
import video2 from './../../images/video2.png';
import video1 from './../../images/video1.png';
import play from './../../images/play.png';


function VideoComponents(props) {

  return (
    <div className="video-track-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="video-track-text">
              <h2>Videos & Tracks</h2>
              <h3>Workout at home with ease</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra
                maecenas accumsan lacus vel facilisis.
              </p>
              <p>
                Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                maecenas accumsan lacus vel facilisis.
              </p>
              <button className="get-started">Get Started</button>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="video-pose">
              <div className="video-first">
                <img src={video1} alt="" />
                <div className="video-tag">
                  <img src={streach} alt="" /> Proffesional Trainer
                </div>
              </div>
              <div className="video-first video-second">
                <img src={video2} alt="" />
                <div className="video-tag">
                  <img src={play} alt="" /> High Quality Video
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoComponents;
