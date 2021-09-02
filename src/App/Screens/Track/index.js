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

export default function Track(props) {
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
                <h3>tracks</h3>
                <p>Welcome to Mindfulness Haven. <br/>Access relaxing sounds different guided meditations, relaxation and yoga.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="course-beginner">
          <div className="container">
            <div className="course-beginner-head">
              <div className="course-beginner-head-left">
                <h2>All Tracks</h2>
              </div>
              <div className="view-all">
                {alltrack == 4 ? (
                  <button onClick={() => setalltrack(trackdata.length)}>
                    View All
                  </button>
                ) : (
                  <button onClick={() => setalltrack(4)}>Show less</button>
                )}
              </div>
            </div>
            <div className="watched-video-list">
              <div className="row">
                {trackdata.length != 0 ? (
                  trackdata.slice(0, alltrack).map((data, i) => {
                    return (
                      <div className="col-lg-3" key={i}>
                        <div className="watched-video-box">
                          <div
                            className="watched-video-box-img"
                            onClick={() =>
                              props.history.push({
                                pathname: "/trackdetails",
                                state: { data: data },
                              })
                            }
                          >
                            <img src={data.audioThumbnail} alt="" />
                          </div>
                          <div className="watched-video-box-text">
                            <div className="rating-list">
                              <button
                                onClick={() =>
                                  data.isFavorite == true
                                    ? RemoveFavorite(data._id)
                                    : AddFavorite(data._id)
                                }
                              >
                                <img
                                  src={data.isFavorite ? addfavorite : favorite}
                                  alt=""
                                  style={{ height: 15 }}
                                />
                              </button>
                            </div>
                            <div
                              onClick={() =>
                                props.history.push({
                                  pathname: "/trackdetails",
                                  state: { data: data },
                                })
                              }
                            >
                              <h5>{data.name}</h5>
                              <p>
                                <span>{data.type}:</span>{" "}
                                {format(data.duration)}
                              </p>
                              <p>
                                <span>Upload by:</span> {data.instructor}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ width: "100%" }}>
                    <p style={{ textAlign: "center" }}>No data Found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="course-beginner new-release">
          <div className="container">
            <div className="course-beginner-head">
              <div className="course-beginner-head-left">
                <h2>New Releases</h2>
              </div>
              <div className="view-all">
                {newtrack == 4 ? (
                  <button onClick={() => setnewtrack(newtrack.length)}>
                    View All
                  </button>
                ) : (
                  <button onClick={() => setnewtrack(4)}>Show less</button>
                )}
              </div>
            </div>
            <div className="watched-video-list">
              <div className="row">
                {trackdata.length != 0 ? (
                  trackdata.slice(0, newtrack).map((data, i) => {
                    return (
                      <div className="col-lg-3" key={i}>
                        <div className="watched-video-box">
                          <div
                            className="watched-video-box-img"
                            onClick={() =>
                              props.history.push({
                                pathname: "/trackdetails",
                                state: { data: data },
                              })
                            }
                          >
                            <img src={data.audioThumbnail} alt="" />
                          </div>
                          <div className="watched-video-box-text">
                            <div className="rating-list">
                              <button
                                onClick={() =>
                                  data.isFavorite == true
                                    ? RemoveFavorite(data._id)
                                    : AddFavorite(data._id)
                                }
                              >
                                <img
                                  src={data.isFavorite ? addfavorite : favorite}
                                  alt=""
                                  style={{ height: 15 }}
                                />
                              </button>
                            </div>
                            <div
                              onClick={() =>
                                props.history.push({
                                  pathname: "/trackdetails",
                                  state: { data: data },
                                })
                              }
                            >
                              <h5>{data.name}</h5>
                              <p>
                                <span>{data.type}:</span>{" "}
                                {format(data.duration)}
                              </p>
                              <p>
                                <span>Upload by:</span> {data.instructor}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ width: "100%" }}>
                    <p style={{ textAlign: "center" }}>No data Found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="course-beginner pb-0">
          <div className="container">
            <div className="course-beginner-head">
              <div className="course-beginner-head-left">
                <h2>Most Played</h2>
              </div>
              <div className="view-all">
                {mostplaytrack == 4 ? (
                  <button
                    onClick={() => setmostplaytrack(mostplaytrack.length)}
                  >
                    View All
                  </button>
                ) : (
                  <button onClick={() => setmostplaytrack(4)}>Show less</button>
                )}
              </div>
            </div>
            <div className="watched-video-list ">
              <div className="row">
                {playeddata.length != 0 ? (
                  playeddata.slice(0, mostplaytrack).map((data, i) => {
                    return (
                      <div className="col-lg-3" key={i}>
                        <div className="watched-video-box">
                          <div className="watched-video-box-img">
                            <img
                              src={data.trackDetails?.audioThumbnail}
                              alt=""
                            />
                          </div>
                          <div className="watched-video-box-text">
                            {/* <div className="rating-list">
                              <img src={favorite} alt="" />
                            </div> */}
                            <h5>{data.trackDetails?.name}</h5>
                            <p>
                              <span>{data.trackDetails?.type}:</span>{" "}
                              {format(data.trackDetails?.duration)}
                            </p>
                            <p>
                              <span>Type:</span> {data.trackDetails?.type}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ width: "100%" }}>
                    <p style={{ textAlign: "center" }}>No data Found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </LoadingOverlay>
      <FooterComponent />
    </>
  );
}
