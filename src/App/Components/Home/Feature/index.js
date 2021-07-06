import React, { useState } from "react";
import "../../../Utils/style.css";
import "../Feature/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Featured1 from './../../../images/featured1.png';
import Featured2 from './../../../images/featured2.png';
import Featured3 from './../../../images/featured3.png';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";

function FeatureComponents(props) {
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
            items:1
            
        },
        1000:{
            items:3
        } 
    }
  }

  return (
    <div className="category-section feature-blog">
      <div className="container">
        <h2 className="heading">Featured Blog</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed<br />
          do eiusmod tempor incididunt ut labore.
        </p>
        <div className="feature-blog-slider">
          <OwlCarousel className="owl-carousel owl-theme" {...options}>
            <div className="item">
              <div className="featured-box">
                <div className="featured-box-img">
                  <img src={Featured1} alt="" />
                </div>
                <div className="featured-box-text">
                  <h4>Begin</h4>
                  <h5>What are the different types of Yoga, and which..</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore.
                  </p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="featured-box">
                <div className="featured-box-img">
                  <img src={Featured2} alt="" />
                </div>
                <div className="featured-box-text">
                  <h4>Heal</h4>
                  <h5>Restorative Yoga for chronic pain</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore.
                  </p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="featured-box">
                <div className="featured-box-img">
                  <img src={Featured3} alt="" />
                </div>
                <div className="featured-box-text">
                  <h4>Move</h4>
                  <h5>What is the somatic approach to Yoga?</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore.
                  </p>
                </div>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </div>
    </div>
  );
}

export default FeatureComponents;
