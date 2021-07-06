import React, { useState, useEffect } from "react";
import "../../Utils/style.css";
import "./../../Utils/css/header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "./../../Components/Comman/header";
import FooterComponent from "./../../Components/Comman/footer";
import "./../../Utils/css/bootstrap.min.css";
import LoadingOverlay from "react-loading-overlay";
import BannerComponents from "../../Components/Home/Banner";
import CategoryComponents from "../../Components/Home/Category";
import AboutComponents from "../../Components/Home/About";
import CoursesComponents from "../../Components/Home/Courses";
import VideoComponents from "../../Components/Home/Videos";
import FeatureComponents from "../../Components/Home/Feature";
import PriceComponents from "../../Components/Home/Price";


function HomeComponents(props) {
  const [show, setShow] = useState(false);
  const onClick = () => {
    setShow(!show)
  }
  return (
    <LoadingOverlay active={false} spinner text="Loading your content...">
      <HeaderComponent
        show={show}
        onClick={onClick}
      />
      <BannerComponents />
      <CategoryComponents />
      <AboutComponents />
      <CoursesComponents />
      <VideoComponents />
      <FeatureComponents />
      <PriceComponents />
      <FooterComponent />
    </LoadingOverlay>
  );
}

export default HomeComponents;
