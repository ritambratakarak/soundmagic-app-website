import React, { useState, useEffect, useRef } from "react";
import "../../Utils/style.css";
import "./../../Utils/css/header.css";
import "./Details.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "./../../Components/Comman/header";
import FooterComponent from "./../../Components/Comman/footer";
import "./../../Utils/css/bootstrap.min.css";
import videoimage from "./../../images/video-watch.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/Actions/auth";
import { toast } from "react-toastify";
import { Network } from "../../Services/Api";
import LoadingOverlay from "react-loading-overlay";
import favorite from "../../images/menu5.png";
import addfavorite from "../../images/heart_fill.png";
import {
  addFavorite,
  removeFavorite,
} from "../../Redux/Actions/favoriteaction";

export default function TrackDetails(props) {
  const dispatch = useDispatch();
  const imgRef = useRef();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paramsdata, setparamsdata] = useState(null);
  const favoritedata = useSelector((state) => state.favorite);
  const [trackdata, settrackdata] = useState([]);

  const onClick = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) != null) {
      let Paramvalue = props.location.state.data;
      setparamsdata(Paramvalue);
      console.log("Paramvalue-->", Paramvalue);
      getTrack();
    } else {
      props.history.push("/login");
    }
  }, []);

  useEffect(() => {
    if (favoritedata != null) {
      if (favoritedata?.favorite != null) {
        const spread = { ...paramsdata, isFavorite: favoritedata.favorite };
        // console.log("spread", spread);
        setparamsdata(spread);
        setLoading(false);
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
          // console.log("track data", res.response_data);
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

  const AddFavorite = async (id) => {
    console.log("add", id);
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
    console.log("remove", id);
    const alldata = JSON.parse(localStorage.getItem("user"));
    const authtoken = alldata.authtoken;
    setLoading(true);
    const submitData = {
      trackID: id,
      authtoken,
    };
    dispatch(removeFavorite(submitData));
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

  return (
    <>
      <LoadingOverlay active={loading} spinner text="Loading your content...">
        <HeaderComponent show={show} onClick={onClick} dashboard={false} />
        <div className="dash-board-main">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="dashboard-content-box">
                  <div className="page-title">{paramsdata?.name}</div>
                  <div className="details-container">
                    <div className="banner-Image">
                      <img src={paramsdata?.audioThumbnail} />
                    </div>
                    <div className="in-one-row">
                      <button className="enroll-now" onClick={()=> props.history.push({
                                pathname: "/player",
                                state: { id: paramsdata?._id, image: paramsdata?.audioThumbnail, url: paramsdata?.audioURL },
                              })}>Play Now</button>
                      <div
                        onClick={() =>
                          paramsdata?.isFavorite == true
                            ? RemoveFavorite(paramsdata._id)
                            : AddFavorite(paramsdata._id)
                        }
                        style={{ marginTop: 20 }}
                      >
                        <img
                          src={
                            paramsdata?.isFavorite == true
                              ? addfavorite
                              : favorite
                          }
                          alt=""
                          style={{ height: 25 }}
                        />
                      </div>
                    </div>
                    <p className="description">{paramsdata?.description}</p>
                    <div className="tag">
                      <h6>Hashtag: </h6>
                      {paramsdata?.hashtag.map((data, index) => {
                        return (
                          <div className="tags" key={index}>
                            <p>{"#" + data}</p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="tag">
                      <h6>Benefit: </h6>
                      {paramsdata?.benefit.map((data, index) => {
                        return (
                          <div className="tags" key={index}>
                            <p>{data}</p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="tag">
                      <div className="tags">
                        <h6>Activity: </h6>
                        <p>{paramsdata?.activity}</p>
                      </div>
                      <div className="tags">
                        <h6>Origin: </h6>
                        <p>{paramsdata?.origin}</p>
                      </div>
                      <div className="tags">
                        <h6>Suitable: </h6>
                        <p>{paramsdata?.suitable}</p>
                      </div>
                      <div className="tags">
                        <h6>Type: </h6>
                        <p>{paramsdata?.type}</p>
                      </div>
                      <div className="tags">
                        <h6>Instructor: </h6>
                        <p>{paramsdata?.instructor}</p>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="dashboard-content-box">
                  <div className="page-title">Related Track</div>
                  <div className="row pt-3">
                    {trackdata.length != 0 ? (
                      trackdata.slice(0, 3).map((data, i) => {
                        return (
                          <div className="col-lg-12" key={i} onClick={()=> setparamsdata(data)}>
                            <div className="watched-video-box">
                              <div className="watched-video-box-img">
                                <img src={data.audioThumbnail} alt="" />
                              </div>
                              <div className="watched-video-box-text">
                                {/* <div className="rating-list">
                                  <button
                                    onClick={() =>
                                      data.isFavorite == true
                                        ? RemoveFavorite(data._id)
                                        : AddFavorite(data._id)
                                    }
                                  >
                                    <img
                                      src={
                                        data.isFavorite ? addfavorite : favorite
                                      }
                                      alt=""
                                      style={{ height: 15 }}
                                    />
                                  </button>
                                </div> */}
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
          </div>
        </div>
      </LoadingOverlay>
      <FooterComponent />
    </>
  );
}
