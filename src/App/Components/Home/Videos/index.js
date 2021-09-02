import React, { useState } from "react";
import "../../../Utils/style.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import streach from './../../../images/streach.png';
import video2 from './../../../images/video2.png';
import video1 from './../../../images/video1.png';
import play from './../../../images/play.png';


function VideoComponents(props) {

  return (
    <div className="video-track-section bg-color">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="video-track-text home-page">
              <h2>Videos & Tracks</h2>
              <h3>Workout at home with ease</h3>
              <p>
                    Anybody who starts the journey in meditation Long term
                    practitioners Children Mums to be and mothers Anyone looking
                    for relaxation and reducing stress Anyone looking to improve
                    sleep Anyone looking for tips and practices to improve
                    physical, mental and emotional wellbeing Anyone looking for
                    gentle and relaxing movement and exercise practices
                  </p>
              <button className="get-started" onClick={props.clicktrack}>Get Started</button>
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
