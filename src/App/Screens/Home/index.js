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
import { toast } from "react-toastify";
import { Network } from "../../Services/Api";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/Actions/auth";

function HomeComponents(props) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [course, setcourse] = useState([]);
  const [blog, setblog] = useState([]);
  const dispatch = useDispatch();
  const onClick = () => {
    setShow(!show);
  };

  useEffect(() => {
    getCourseData();
    getBlogData()
  }, []);

  const getCourseData = async () => {
    const alldata = JSON.parse(localStorage.getItem("user"));
    const authtoken = null;
    setLoading(true);
    Network("get-course-web?page=1&limit=1000", "get", { authtoken })
      .then(async (res) => {
        setLoading(false);
        if (res.response_code === 200) {
          // console.log("course data", res.response_data);
          setcourse(res.response_data.docs);
        } else if (res.response_code === 4000) {
          toast.warn(res.response_message);
          localStorage.removeItem("user");
          dispatch(logoutUser());
        } else {
          toast.warn(res.response_message);
        }
      })
      .catch((error) => {
        toast.error(error);
        setLoading(false);
      });
  };

  const getBlogData = async () => {
    const alldata = JSON.parse(localStorage.getItem("user"));
    const authtoken = null;
    setLoading(true);
    Network("get-blog-list?page=1&limit=1000", "get", { authtoken })
      .then(async (res) => {
        setLoading(false);
        if (res.response_code === 200) {
          // console.log("blog data", res.response_data);
          setblog(res.response_data.docs);
        } else if (res.response_code === 4000) {
          toast.warn(res.response_message);
          localStorage.removeItem("user");
          dispatch(logoutUser());
        } else {
          toast.warn(res.response_message);
        }
      })
      .catch((error) => {
        toast.error(error);
        setLoading(false);
      });
  };


  return (
    <LoadingOverlay active={loading} spinner text="Loading your content...">
      <HeaderComponent show={show} onClick={onClick} dashboard={true} mainsearch={()=> props.history.push("Track")} />
      <BannerComponents />
      <CategoryComponents />
      <AboutComponents click={()=> props.history.push({pathname: "/about"})} />
      {/* <CoursesComponents data={course}  /> */}
      <VideoComponents clicktrack={()=> props.history.push({pathname: "/track"})} />
      <FeatureComponents data={blog} onPress={(data)=> props.history.push({
                                pathname: "/blogdetails",
                                state: { data: data },
                              })} />
      <PriceComponents />
      <FooterComponent />
    </LoadingOverlay>
  );
}

export default HomeComponents;
