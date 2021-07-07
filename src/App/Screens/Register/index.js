import React, { useState, useEffect } from "react";
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

function Register(props) {
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [visable, setvisable] = useState(false);
  const [visable2, setvisable2] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const dispatch= useDispatch();

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem("user")) != null){
      props.history.push("/")
    }
  }, [])

  const schema = yup.object().shape({
    firstname: yup.string().required("First Name is required!"),
    lastname: yup.string().required("Last Name is required!"),
    email: yup
      .string()
      .email("Not a valid email !")
      .required("Email is required!"),
    password: yup.string().required("Password is required!"),
    cpassword: yup.string()
    .required('Confirm password is required !')
    .oneOf(
      [yup.ref('password'), null],
       'Passwords must match',
     )
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = (data) => {
    console.log("data", data);
    var obj = {
      fname: data.firstname,
      lname: data.lastname,
      email: data.email,
      password: data.password,
    };
    Network("register", "post", obj)
    .then(async (res) => {
      console.log("res success login--->", res);
      if (res.response_code == 200) {
        setLoading(false);
        toast.success(res.response_message);
        // localStorage.setItem("user", JSON.stringify(res.response_data));
        // dispatch(loginUser(res.response_data));
        props.history.replace("login");
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

  const handleClickShowPassword = () => {
    setvisable(!visable);
  };

  const handleClickShowPassword2 = () => {
    setvisable2(!visable2);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
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
            <h2>Sign Up</h2>
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(submit)}
            >
              <TextField
                required
                id="filled-basic"
                label="First Name"
                variant="filled"
                type={"text"}
                disabled={false}
                onChange={(e) => setFname(e.target.value)}
                {...register("firstname")}
              />
              <p className="error-text">{errors.firstname?.message}</p>

              <TextField
                required
                id="filled-basic"
                label="Last Name"
                variant="filled"
                type={"text"}
                disabled={false}
                onChange={(e) => setLname(e.target.value)}
                {...register("lastname")}
              />
              <p className="error-text">{errors.lastname?.message}</p>
              <TextField
                required
                id="filled-basic"
                label="Email"
                variant="filled"
                type={"email"}
                disabled={false}
                onChange={(e) => setEmail(e.target.value)}
                {...register("email")}
              />
              <p className="error-text">{errors.email?.message}</p>
              <FormControl variant="filled">
                <InputLabel required htmlFor="filled-adornment-password">
                  Password
                </InputLabel>
                <FilledInput
                  id="filled-adornment-password"
                  label="Password"
                  disabled={false}
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
              <FormControl variant="filled">
                <InputLabel required htmlFor="filled-adornment-password">
                  Confirm Password
                </InputLabel>
                <FilledInput
                  id="filled-adornment-password"
                  label="Confirm Password"
                  disabled={false}
                  {...register("cpassword")}
                  type={visable2 ? "text" : "password"}
                  value={cpassword}
                  onChange={(e) => setcpassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {visable2 ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <p className="error-text">{errors.cpassword?.message}</p>
              <div className="login-button-set">
                <button type="submit">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
