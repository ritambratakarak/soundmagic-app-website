import React, { useState, useEffect, useRef } from "react";
import "../../Utils/style.css";
import "./../../Utils/css/header.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "./../../Components/Comman/header";
import FooterComponent from "./../../Components/Comman/footer";
import "./../../Utils/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/Actions/auth";
import { toast } from "react-toastify";
import { Network } from "../../Services/Api";
import LoadingOverlay from "react-loading-overlay";
import banner from "../../images/inner-banner.png";
import favorite from "../../images/menu5.png";
import addfavorite from "../../images/heart_fill.png";
import {
  addFavorite,
  removeFavorite,
} from "../../Redux/Actions/favoriteaction";
import video1 from "../../images/video1.png";
import video2 from "../../images/video2.png";
import stretch from "../../images/streach.png";
import play from "../../images/play.png";
import about_image from "../../images/about-video.png";

export default function About(props) {
  const dispatch = useDispatch();
  const imgRef = useRef();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trackdata, settrackdata] = useState([]);
  const [playeddata, setplayeddata] = useState([]);
  const [alltrack, setalltrack] = useState(4);
  const [newtrack, setnewtrack] = useState(4);
  const [mostplaytrack, setmostplaytrack] = useState(4);
  const favoritedata = useSelector((state) => state.favorite);

  const onClick = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) != null) {
      getTrack();
      getMostPalyedTrack();
    } else {
      props.history.push("/login");
    }
  }, []);

  useEffect(() => {
    if (favoritedata != null) {
      if (favoritedata?.favorite != null) {
        getTrack();
        dispatch(addFavorite(null));
      }
    }
  }, [favoritedata]);

  const getTrack = async () => {
    setLoading(true);
    const alldata = JSON.parse(localStorage.getItem("user"));
    const authtoken = alldata.authtoken;
    Network(`get-track-list`, "get", { authtoken })
      .then(async (res) => {
        setLoading(false);
        if (res.response_code === 200) {
          console.log("track data", res.response_data);
          settrackdata(res.response_data.docs);
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

  const getMostPalyedTrack = async () => {
    setLoading(true);
    const alldata = JSON.parse(localStorage.getItem("user"));
    const authtoken = alldata.authtoken;
    Network(`get-user-recent-play?sortby=1`, "get", { authtoken })
      .then(async (res) => {
        setLoading(false);
        if (res.response_code === 200) {
          console.log("most played data", res.response_data);
          setplayeddata(res.response_data.docs);
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
    <>
      <LoadingOverlay active={loading} spinner text="Loading your content...">
        <HeaderComponent show={show} onClick={onClick} dashboard={true} />
        <div className="banner">
          <img src={banner} alt="" />
          <div className="banner-text">
            <div className="container">
              <div className="banner-text-inner">
                <h3>About Us</h3>
                <p>
                  Welcome to Mindfulness Haven. <br />
                  Access relaxing sounds different guided meditations,
                  relaxation and yoga.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="video-track-section">
          <div class="container">
            <div class="row">
              <div class="col-lg-6">
                <div class="video-pose">
                  <div class="video-first" onClick={()=> props.history.push({
                                pathname: "/player",
                                state: { id: trackdata[1]?._id, image: trackdata[1]?.audioThumbnail, url: trackdata[1]?.audioURL },
                              })}>
                    <img src={video1} alt="" />
                    <div class="video-tag">
                      <img src={stretch} alt="" /> Proffesional Trainer
                    </div>
                  </div>
                  <div class="video-first video-second" onClick={()=> props.history.push({
                                pathname: "/player",
                                state: { id: trackdata[2]?._id, image: trackdata[2]?.audioThumbnail, url: trackdata[2]?.audioURL },
                              })}>
                    <img src={video2} alt="" />
                    <div class="video-tag">
                      <img src={play} alt="" /> High Quality Video
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="video-track-text">
                  <h2>About Us</h2>
                  <h3>
                    Take your Yoga to the next
                    <br /> level with us
                  </h3>
                  <p>
                    People behind the app are long-term meditators and sound
                    practitioners who wanted to share their experience with
                    others, and open space for others to share their insights.
                    <br />{" "}
                  </p>
                  <p>
                    Anybody who starts the journey in meditation Long term
                    practitioners Children Mums to be and mothers Anyone looking
                    for relaxation and reducing stress Anyone looking to improve
                    sleep Anyone looking for tips and practices to improve
                    physical, mental and emotional wellbeing Anyone looking for
                    gentle and relaxing movement and exercise practices
                  </p>
                  <p>Content is divided into three main categories, but we generally focus on mindfulness-based practices, music tracks for relaxation and sleep, movement and yoga kids, pregnancy and motherhood. We have sections that include trauma- sensitive practices and anxiety and stress management, talks.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="big-video" onClick={()=> props.history.push({
                                pathname: "/player",
                                state: { id: trackdata[0]?._id, image: trackdata[0]?.audioThumbnail, url: trackdata[0]?.audioURL },
                              })}>
            {/* <img src={about_image} alt="" /> */}
            <img src={about_image} alt="" />
          </div>
        </div>
      </LoadingOverlay>
      <FooterComponent />
    </>
  );
}
