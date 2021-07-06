import React, { useState } from "react";
import "../../../Utils/style.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Course1 from './../../../images/course1.png';
import Course2 from './../../../images/course2.png';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";

function CoursesComponents(props) {
  const options = {
    loop:true,
    margin:30,
    nav:true,
    dots:false,
    autoplay: false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1
           
        },
        600:{
            items:2
            
        },
        1000:{
            items:4
        } 
    }
  }

  return (
    <div className="category-section course-section">
      <div className="container">
        <h2 className="heading">Courses</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed<br />
          do eiusmod tempor incididunt ut labore.
        </p>
        <div className="course-slider">
          <OwlCarousel id="courseSlider" className="owl-carousel owl-theme" {...options}>
            <div className="item">
              <div className="course-box">
                <div className="course-box-img">
                  <img src={Course1} alt="" />
                </div>
                <h4>Beginners Course</h4>
              </div>
            </div>
            <div className="item">
              <div className="course-box">
                <div className="course-box-img">
                  <img src={Course2} alt="" />
                </div>
                <h4>Yamas and Niyamas</h4>
              </div>
            </div>
            <div className="item">
              <div className="course-box">
                <div className="course-box-img">
                  <img src={Course1} alt="" />
                </div>
                <h4>The Smart Flow Yoga</h4>
              </div>
            </div>
            <div className="item">
              <div className="course-box">
                <div className="course-box-img">
                  <img src={Course2} alt="" />
                </div>
                <h4>Mastering Anxiety</h4>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </div>
    </div>
  );
}

export default CoursesComponents;
