import React, { useState } from "react";
import "../../../Utils/style.css";
import "../Category/category.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Category1 from './../../../images/category1.png';
import Category2 from './../../../images/category2.png';
import Category3 from './../../../images/category3.png';
import Category4 from './../../../images/category4.png';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";

function CategoryComponents(props) {
  const options = {
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    autoplay: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  }

  return (
    <div className="category-section">
        <div className="container">
          <h2 className="heading">Categories</h2>
          <p className="description">
          Access relaxing sounds different guided meditations, relaxation and yoga.
          </p>
          <div className="category-slider">
            <OwlCarousel className="owl-carousel owl-theme" {...options}>
              <div className="item">
                <div className="category-box">
                  <div className="category-box-icon">
                    <img src={Category1} alt="" />
                  </div>
                  <h4>Breath</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
              <div className="item">
                <div className="category-box">
                  <div className="category-box-icon">
                    <img src={Category2} alt="" />
                  </div>
                  <h4>Timer</h4>
                  <p>
                    Quis ipsum suspendisse ultrices gravida risus commodo
                    viverra.
                  </p>
                </div>
              </div>
              <div className="item">
                <div className="category-box">
                  <div className="category-box-icon">
                    <img src={Category3} alt="" />
                  </div>
                  <h4>Courses</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
              <div className="item">
                <div className="category-box">
                  <div className="category-box-icon">
                    <img src={Category4} alt="" />
                  </div>
                  <h4>Talks</h4>
                  <p>
                    Quis ipsum suspendisse ultrices gravida risus commodo
                    viverra.
                  </p>
                </div>
              </div>
              <div className="item">
                <div className="category-box">
                  <div className="category-box-icon">
                    <img src={Category1} alt="" />
                  </div>
                  <h4>Talks</h4>
                  <p>
                    Quis ipsum suspendisse ultrices gravida risus commodo
                    viverra.
                  </p>
                </div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </div>
  );
}

export default CategoryComponents;
