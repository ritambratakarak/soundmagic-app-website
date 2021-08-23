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

export default function BlogDetails(props) {
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
    Network(`get-blog-list?page=1&limit=1000`, "get", { authtoken })
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
                      <img src={paramsdata?.banner} />
                    </div>
                    <div className="in-one-row pb-0">
                      <p className={"pb-0"}><b>Category:</b>{paramsdata?.categoryDetails?.name}</p>
                    </div>
                    <p className="description">{paramsdata?.description}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="dashboard-content-box">
                  <div className="page-title">Related Blog</div>
                  <div className="row pt-3">
                    {trackdata.length != 0 ? (
                      trackdata.slice(0, 3).map((data, i) => {
                        return (
                          <div className="col-lg-12" key={i} onClick={()=> setparamsdata(data)}>
                            <div className="watched-video-box">
                              <div className="watched-video-box-img">
                                <img src={data.banner} alt="" />
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
