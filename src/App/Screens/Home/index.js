import React, { useState } from "react";
import "../../Utils/style.css";
import "./../../Utils/css/header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "./../../Components/Comman/header";
import FooterComponent from "./../../Components/Comman/footer";
import "./../../Utils/css/bootstrap.min.css";
import LoadingOverlay from "react-loading-overlay";
import BannerComponents from "../../Components/Banner";
import CategoryComponents from "../../Components/Category";
import AboutComponents from "../../Components/About";
import CoursesComponents from "../../Components/Courses";
import VideoComponents from "../../Components/Videos";
import FeatureComponents from "../../Components/Feature";
import PriceComponents from "../../Components/Price";


function HomeComponents(props) {
  return (
    <LoadingOverlay active={false} spinner text="Loading your content...">
      <HeaderComponent />
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
