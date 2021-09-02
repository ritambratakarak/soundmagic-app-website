import React, { useState, useEffect, useRef } from "react";
import "../../Utils/style.css";
import "./../../Utils/css/header.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "../../Components/Comman/header";
import FooterComponent from "../../Components/Comman/footer";
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
import course from "../../images/course.png";
import course1 from "../../images/course1.png";
import course2 from "../../images/course2.png";
import play from "../../images/play.png";
import yamas from "../../images/yamas.png";

export default function Courses(props) {
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

  function format(time) {
    let hrs = ~~(time / 3600);
    let mins = ~~((time % 3600) / 60);
    let secs = ~~time % 60;
    let ret = "";
    if (hrs > 0) {
      ret += "" + hrs + " hours " + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + " min " + (secs < 10 ? "0" : "");
    ret += "" + secs + " sec ";
    return ret;
  }

  const AddFavorite = async (id) => {
    const alldata = JSON.parse(localStorage.getItem("user"));
    const authtoken = alldata.authtoken;
    const submitData = {
      trackID: id,
      authtoken,
    };
    setLoading(true);
    dispatch(addFavorite(submitData));
  };

  const RemoveFavorite = async (id) => {
    const alldata = JSON.parse(localStorage.getItem("user"));
    const authtoken = alldata.authtoken;
    setLoading(true);
    const submitData = {
      trackID: id,
      authtoken,
    };
    dispatch(removeFavorite(submitData));
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
                <h3>Courses</h3>
                <p>
                  We are the most popular yoga studio in town. Rated by more
                  <br /> than 1000+ customers
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <div class="category-section course-section">
          <div class="container">
            <div class="course-slider">
              <div id="courseSlider" class="owl-carousel owl-theme">
                <div class="item">
                  <div class="course-box">
                    <div class="course-box-img">
                      <img src={course1} alt="" />
                    </div>
                    <h4>Beginners Course</h4>
                  </div>
                </div>
                <div class="item">
                  <div class="course-box">
                    <div class="course-box-img">
                      <img src={course2} alt="" />
                    </div>
                    <h4>Yamas and Niyamas</h4>
                  </div>
                </div>
                <div class="item">
                  <div class="course-box">
                    <div class="course-box-img">
                      <img src={course1} alt="" />
                    </div>
                    <h4>The Smart Flow Yoga</h4>
                  </div>
                </div>
                <div class="item">
                  <div class="course-box">
                    <div class="course-box-img">
                      <img src={course2} alt="" />
                    </div>
                    <h4>Mastering Anxiety</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div class="course-beginner">
          <div class="container">
            <div class="course-beginner-head">
              <div class="course-beginner-head-left">
                <h2>Beginners Course</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore.
                </p>
              </div>
              <div class="view-all">
                <button>View All</button>
              </div>
            </div>
            <div class="watched-video-list">
              <div class="row">
                <div class="col-lg-4">
                  <div class="watched-video-box">
                    <div class="watched-video-box-img">
                      <img src={course} alt="" />
                    </div>
                    <div class="watched-video-box-text">
                      <div class="rating-list">4.8</div>
                      <h5>Women working out</h5>
                      <p>
                        <span>Category:</span> Yoga
                      </p>
                      <p>
                        <span>Tutor:</span> Jasica Smith
                      </p>
                      <p>10 Videos &amp; 2 Audios</p>
                      <div class="price-value">$59</div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4">
                  <div class="watched-video-box">
                    <div class="watched-video-box-img">
                      <img src={course} alt="" />
                    </div>
                    <div class="watched-video-box-text">
                      <div class="rating-list">4.8</div>
                      <h5>Women working out</h5>
                      <p>
                        <span>Category:</span> Yoga
                      </p>
                      <p>
                        <span>Tutor:</span> Jasica Smith
                      </p>
                      <p>10 Videos &amp; 2 Audios</p>
                      <div class="price-value">$59</div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4">
                  <div class="watched-video-box">
                    <div class="watched-video-box-img">
                      <img src={course} alt="" />
                    </div>
                    <div class="watched-video-box-text">
                      <div class="rating-list">4.8</div>
                      <h5>Women working out</h5>
                      <p>
                        <span>Category:</span> Yoga
                      </p>
                      <p>
                        <span>Tutor:</span> Jasica Smith
                      </p>
                      <p>10 Videos &amp; 2 Audios</p>
                      <div class="price-value">$59</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div class="course-beginner yamas-section">
          <div class="container">
            <div class="course-beginner-head">
              <div class="course-beginner-head-left">
                <h2>Yamas and Niyamas</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore.
                </p>
              </div>
              <div class="view-all">
                <button>View All</button>
              </div>
            </div>
            <div class="watched-video-list">
              <div class="row">
                <div class="col-lg-4">
                  <div class="watched-video-box">
                    <div class="watched-video-box-img">
                      <img src={yamas} alt="" />
                    </div>
                    <div class="watched-video-box-text">
                      <div class="rating-list">4.8</div>
                      <h5>Women working out</h5>
                      <p>
                        <span>Category:</span> Yoga
                      </p>
                      <p>
                        <span>Tutor:</span> Jasica Smith
                      </p>
                      <p>10 Videos &amp; 2 Audios</p>
                      <div class="price-value">$59</div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4">
                  <div class="watched-video-box">
                    <div class="watched-video-box-img">
                      <img src={yamas} alt="" />
                    </div>
                    <div class="watched-video-box-text">
                      <div class="rating-list">4.8</div>
                      <h5>Women working out</h5>
                      <p>
                        <span>Category:</span> Yoga
                      </p>
                      <p>
                        <span>Tutor:</span> Jasica Smith
                      </p>
                      <p>10 Videos &amp; 2 Audios</p>
                      <div class="price-value">$59</div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4">
                  <div class="watched-video-box">
                    <div class="watched-video-box-img">
                      <img src={yamas} alt="" />
                    </div>
                    <div class="watched-video-box-text">
                      <div class="rating-list">4.8</div>
                      <h5>Women working out</h5>
                      <p>
                        <span>Category:</span> Yoga
                      </p>
                      <p>
                        <span>Tutor:</span> Jasica Smith
                      </p>
                      <p>10 Videos &amp; 2 Audios</p>
                      <div class="price-value">$59</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="loadmore-section">
              <button>Load more</button>
            </div>
          </div>
        </div>
      </LoadingOverlay>
      <FooterComponent />
    </>
  );
}
