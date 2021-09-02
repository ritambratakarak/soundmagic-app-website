import React, { useState, useEffect, useRef } from "react";
import "../../Utils/style.css";
import "./../../Utils/css/header.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "../../Components/Comman/header";
import FooterComponent from "../../Components/Comman/footer";
import "./../../Utils/css/bootstrap.min.css";
import videoimage from "./../../images/video-watch.png";
import pencil from "./../../images/pencil2.png";
import Sidemenu from "../../Components/Sidemenu/Sidemenu";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/Actions/auth";
import { toast } from "react-toastify";
import { base_url, Network } from "../../Services/Api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import "./../../Components/Sidemenu/index.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%",
      height: 55,
      color: "#051445",
      fontSize: 18,
      padding: 0,
      outline: 0,
      backgroundColor: "transparent",
    },
  },
}));

export default function RecentPlayed(props) {
  const dispatch = useDispatch();
  const imgRef = useRef();
  const [show, setShow] = useState(false);
  const [user, setuser] = useState({});
  const [tab, settab] = useState("1");
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [oldpassword, setoldpassword] = useState("");
  const [visable, setvisable] = useState(false);
  const [visable2, setvisable2] = useState(false);
  const [visable3, setvisable3] = useState(false);
  const [file, setFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [playedcourse, setplayedcourse] = React.useState([]);

  const schema = yup.object().shape({
    oldpassword: yup.string().required("Old Password is required!"),
    password: yup.string().required("Password is required!"),
    cpassword: yup
      .string()
      .required("Confirm password is required !")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onClick = () => {
    setShow(!show);
  };

  const tabChange = (tab) => {
    settab(tab);
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) != null) {
      getData();
      getRecentPlayedCourse();
    } else {
      props.history.push("/login");
    }
  }, []);

  const getData = async () => {
    const alldata = JSON.parse(localStorage.getItem("user"));
    const authtoken = alldata.authtoken;
    setLoading(true);
    Network("view-profile", "get", { authtoken })
      .then(async (res) => {
        setLoading(false);
        if (res.response_code === 200) {
          console.log("profile data", res.response_data);
          setuser(res.response_data);
          setEmail(res.response_data.email);
          setFname(res.response_data.fname);
          setLname(res.response_data.lname);
          // const userdata = res.response_data;
          // const sprate = {...data, fname: userdata.fname, lname: userdata.lname};
          // dispatch(loginUser(sprate))
          // await AsyncStorage.setItem('@user', JSON.stringify(sprate))
          // Toast.show(res.response_message);
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

  const submit = (event) => {
    if (fname == "") {
      toast.warn("Fname cannot blank");
    } else if (lname == "") {
      toast.warn("Lname cannot blank");
    } else {
      const alldata = JSON.parse(localStorage.getItem("user"));
      const authtoken = alldata.authtoken;
      var obj = {
        fname: fname,
        lname: lname,
        authtoken,
      };
      Network("edit-profile", "post", obj)
        .then(async (res) => {
          if (res.response_code == 200) {
            setLoading(false);
            toast.success(res.response_message);
            getData();
          } else if (res.response_code == 5010) {
            setLoading(false);
            toast.warn(res.response_message);
          } else {
            setLoading(false);
            toast.warn(res.response_message);
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Something went wrong !");
          console.log("error===>", error);
        });
    }
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setvisable(!visable);
  };

  const handleClickShowPassword2 = () => {
    setvisable2(!visable2);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changepassword = (values, e) => {
    e.target.reset();
    const alldata = JSON.parse(localStorage.getItem("user"));
    const authtoken = alldata.authtoken;
    var obj = {
      currentpassword: values.oldpassword,
      password: values.password,
      cnfpassword: values.cpassword,
      authtoken,
    };
    Network("update-password", "post", obj)
      .then(async (res) => {
        if (res.response_code == 200) {
          setLoading(false);
          toast.success(res.response_message);
          settab("0");
          // localStorage.setItem("user", JSON.stringify(res.response_data));
          // dispatch(loginUser(res.response_data));
        } else if (res.response_code == 5010) {
          setLoading(false);
          toast.warn(res.response_message);
        } else {
          setLoading(false);
          toast.error(res.response_message);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Something went wrong !");
        console.log("error===>", error);
      });
  };

  const _handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
    _onSubmitImageUpdate();
  };

  const _onSubmitImageUpdate = () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    let form = new FormData();
    form.append("image", file);
    axios({
      method: "POST",
      url: base_url + "edit-profileImage",
      headers: {
        // Accept: 'application/json',
        "x-access-token": user.authtoken,
        // 'Content-Type': 'application/json'
      },
      data: form,
    })
      .then(function (response) {
        setLoading(false);
        console.log("response", response);
        if (response.data?.response_code == 200) {
          toast.success("Upload Successfully");
        } else {
          toast.error("Upload Failure");
        }
        // document.getElementById('väljund').innerHTML = JSON.stringify(muutuja);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Something went wrong !");
        console.log("error===>", error);
      });
  };

  const getRecentPlayedCourse = async () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const authtoken = user.authtoken;
    Network(`/get-user-recent-play?page=${1}&limit=${100}`, "get", {
      authtoken,
    })
      .then(async (res) => {
        setLoading(false);
        if (res.response_code === 200) {
          console.log("Played data", res.response_data.docs);
          setplayedcourse(res.response_data.docs);
          // Toast.show(res.response_message);
        } else if (res.response_code === 4000) {
          toast.warn(res.response_message);
          localStorage.removeItem("user");
          dispatch(logoutUser());
        } else {
          toast.error(res.response_message);
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
              {/* <Sidemenu /> */}
              <div className="col-lg-3">
                <div className="dashboard-menu">
                  <ul>
                    <li>
                      <Link to="profile" className="menu1">
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="" className="menu2">
                        My Subscriptions
                      </Link>
                    </li>
                    {/* <li>
            <Link to="" className="menu3">
              My Courses
            </Link>
          </li> */}
                    {/* <li>
                      <Link to="" className="menu4">
                        My Playlists
                      </Link>
                    </li> */}
                    <li>
                      <Link to="myfavorite" className="menu5">
                        My Favourite
                      </Link>
                    </li>
                    <li>
                      <Link to="recentplayed" className="menu6 active">
                        Recently Watched
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="dashboard-content-box">
                  <div className="page-title">Recently Watched</div>
                  <div className="watched-video-section">
                    <div className="watched-video-list">
                      <div className="row">
                        {playedcourse.length != 0 ? (
                          playedcourse.map((data, i) => {
                            return (
                              <div className="col-lg-4" key={i}>
                                <div
                                  className="watched-video-box"
                                  onClick={() =>
                                    props.history.push({
                                      pathname: "/player",
                                      state: {
                                        id: data.trackDetails._id,
                                        image: data.trackDetails.audioThumbnail,
                                        url: data.trackDetails.audioURL,
                                      },
                                    })
                                  }
                                >
                                  <div className="watched-video-box-img">
                                    <img
                                      src={data.trackDetails.audioThumbnail}
                                      alt=""
                                    />
                                  </div>
                                  <div className="watched-video-box-text">
                                    <div className="whilist-icon">
                                      <img src="images/menu5.png" alt="" />
                                    </div>
                                    <h5>{data.trackDetails.name}</h5>
                                    <p>
                                      <span>{data.trackDetails.type}:</span>{" "}
                                      {format(data.trackDetails.duration)}
                                    </p>
                                    <p>
                                      <span>Upload by:</span> Admin
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div>
                            <p>No data Found</p>
                          </div>
                        )}
                      </div>
                    </div>
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
