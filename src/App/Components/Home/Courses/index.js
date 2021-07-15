import React, { useState, useEffect } from "react";
import "../../../Utils/style.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";

function CoursesComponents({ data }) {
  const [caurse, setcaurse] = useState([]);

  useEffect(() => {
    setcaurse(data);
  }, [data]);

  const options = {
    loop: true,
    margin: 30,
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
  };

  return (
    <div className="category-section course-section">
      <div className="container">
        <h2 className="heading">Courses</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          <br />
          do eiusmod tempor incididunt ut labore.
        </p>
        <div className="course-slider">
          {caurse.length && (
            <OwlCarousel
              id="courseSlider"
              className="owl-carousel owl-theme"
              {...options}
            >
              {caurse.map((item, i) => {
                return(<div className="item" key={i}>
                  <div className="course-box">
                    <div className="course-box-img">
                      <img src={item.banner} alt="" />
                    </div>
                    <h4>{item.name}</h4>
                  </div>
                </div>)
              })}
            </OwlCarousel>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoursesComponents;
