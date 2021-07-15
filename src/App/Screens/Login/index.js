import React, { useEffect, useState } from "react";
import "../../Utils/style.css";
import "../Login/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./../../images/Logo.png";
import loginBg from "./../../images/login-bg.png";
import { Input } from "../../Components/Comman/Input";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Network } from "../../Services/Api";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "./../../Redux/Actions/auth";
import { Link } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";

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

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [visable, setvisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) != null) {
      props.history.push("/");
    }
  }, []);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Not a valid email !")
      .required("Email is required !"),
    password: yup.string().required("Password is required !"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = (data) => {
    var obj = {
      email: data.email,
      password: data.password,
      apptype: "WEB",
      devicetoken: "123456",
    };
    Network("login", "post", obj)
      .then(async (res) => {
        console.log("res success login--->", res);
        if (res.response_code == 200) {
          setLoading(false);
          toast.success(res.response_message);
          localStorage.setItem("user", JSON.stringify(res.response_data));
          dispatch(loginUser(res.response_data));
          props.history.replace("/");
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
  };

  const handleClickShowPassword = () => {
    setvisable(!visable);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <LoadingOverlay active={loading} spinner text="Loading your content...">
      <div className="login-page">
        <div className="login-page-inner">
          <div className="login-inner-left">
            <div className="login-logo">
              <a href="#">
                <img src={logo} alt="" />
              </a>
            </div>
            <div className="login-banner-bg">
              <img src={loginBg} alt="" />
            </div>
          </div>
          <div className="login-inner-right">
            <div className="login-form">
              <h2>Sign In</h2>
              <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(submit)}
              >
                <TextField
                  required
                  id="filled-basic"
                  label="Email"
                  variant="filled"
                  type={"email"}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                  {...register("email")}
                />
                <p className="error-text">{errors.email?.message}</p>
                <FormControl variant="filled">
                  <InputLabel required htmlFor="filled-adornment-password">
                    Password
                  </InputLabel>
                  <FilledInput
                    required
                    id="filled-adornment-password"
                    label="Password"
                    variant="filled"
                    type={"password"}
                    disabled={loading}
                    {...register("password")}
                    type={visable ? "text" : "password"}
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {visable ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <p className="error-text">{errors.password?.message}</p>
                <p className="forgot-password">
                  <Link to="/forgotpassword">
                    <span>Forgot Password</span>
                  </Link>
                </p>
                <div className="login-button-set">
                  <button type="submit">Sign In</button>
                </div>
              </form>
              <p className="register-now">
                Don't have an account?{" "}
                <Link to="/signup">
                  <b>Register Now</b>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
}

export default Login;
