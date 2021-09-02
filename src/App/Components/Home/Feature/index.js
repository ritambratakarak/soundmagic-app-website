import React, { useState, useEffect } from "react";
import "../../../Utils/style.css";
import "../Feature/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Featured1 from "./../../../images/featured1.png";
import Featured2 from "./../../../images/featured2.png";
import Featured3 from "./../../../images/featured3.png";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";

function FeatureComponents({ data, onPress }) {
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
        items: 1,
      },
      1000: {
        items: 3,
      },
    },
  };

  return (
    <div className="category-section feature-blog">
      <div className="container">
        <h2 className="heading">Featured Blog</h2>
        <p className="description">
        Access relaxing sounds different guided meditations, relaxation and yoga.
        </p>
        <div className="feature-blog-slider">
          {caurse.length && (
            <OwlCarousel className="owl-carousel owl-theme" {...options}>
              {caurse.map((item, i) => {
                return (
                  <div className="item" key={i} onClick={()=>onPress(item)}>
                    <div className="featured-box">
                      <div className="featured-box-img">
                        <img src={item.banner} alt="" />
                      </div>
                      <div className="featured-box-text">
                        <h4>{item.categoryDetails.name}</h4>
                        <h5>
                        {item.name}
                        </h5>
                        <p>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </OwlCarousel>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeatureComponents;
