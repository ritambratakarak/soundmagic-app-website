import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import './../../Utils/css/header.css'
import '../../Utils/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import OtpComponent from './../../Components/Comman/verify-otp'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import HeaderComponent from './../../Components/Comman/header';
import FooterComponent from './../../Components/Comman/footer';
import { Network } from './../../Services/Api';
import { useDispatch } from 'react-redux';
import { loginUser } from "./../../Redux/Actions/auth"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingOverlay from 'react-loading-overlay';

function LoginComponents(props) {

    const [input, setInput] = useState({})
    const [errors, setError] = useState({})
    const dispatch = useDispatch()     
    const [otp, setOtp] = useState('')
    const [otpShow, setOtpShow] = useState(false)
    const [isLoading, setLoading] = useState(false)


    const validate = () => {
        let input1 = input;
        let errors = {};
        let isValid = true;

        if (!input1["email"]) {
            isValid = false;
            errors["email"] = "Please enter your email Address.";
        }

        if (typeof input1["email"] !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input1["email"])) {
                isValid = false;
                errors["email"] = "Please enter valid email address.";
            }
        }

        if (!input1["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }
        setError(errors)

        return isValid;
    }
    //.........for on change mether.............

    const handleChange = (event) => {
        let input1 = input;
        input1[event.target.name] = event.target.value;
        setInput(input1)
    }

    //.........Login submit............

    const handleSubmit = (event) => {
        if (validate()) {
            var obj = {
                "email": input['email'],
                "password": input['password'],
                "apptype": "WEB",
                "devicetoken": "123456"
            }
            setLoading(true)


            Network('login', 'post', obj)
                .then(async (res) => {
                    // console.log("res success login--->", res);
                    if (res.response_code == 2000) {
                        setLoading(false)
                        toast.success(res.response_message)
                        localStorage.setItem('user', JSON.stringify(res.response_data));
                        dispatch(loginUser(res.response_data))
                        props.history.replace("/");
                    } else if (res.response_code == 5010) {
                        setLoading(false)
                        handleGenerateOtp()
                        toast.warn(res.response_message)
                    } else {
                        setLoading(false)
                        toast.error(res.response_message)
                    }
                })
                .catch((error) => {
                    setLoading(false)
                    toast.error("Something went wrong !")
                    console.log("error===>", error)
                });

        }
        event.preventDefault();
    }

    const handleGenerateOtp = () => {
        var obj = {
            "email": input['email']
        }
        setLoading(true)

        Network('generate-otp', 'post', obj)
            .then(async (res) => {
                console.log("res success generate otp--->", res);
                if (res.response_code == 2000) {
                    setOtpShow(true)
                    setLoading(false)
                    toast.success(res.response_message)
                }
            })
            .catch((error) => {
                setLoading(false)
                toast.error("Something went wrong !")
                console.log("error===>", error)
            });
    }


    const handleSubmitOtp = () => {
        var obj = {
            "email": input['email'],
            'otp': otp
        }
        setLoading(true)

        Network('verify-otp', 'post', obj)
            .then(async (res) => {
                console.log("res success verify otp--->", res);
                if (res.response_code == 2000) {
                    setOtpShow(false)
                    setLoading(false)
                    toast.success(res.response_message)
                } else {
                    toast.error(res.response_message)
                    setLoading(false)
                }
            })
            .catch((error) => {
                setLoading(false)
                toast.error("Something went wrong !")
                console.log("error===>", error)
            });
    }

    return (
        <>

            <ToastContainer />

            <HeaderComponent
               
                pageType={"home"}
            />

            <OtpComponent
                show={otpShow}
                onClick={() => setOtpShow(false)}
                handleChange={(val) => setOtp(val)}
                onSubmitOtp={() => handleSubmitOtp()}
            />

            <Modal show={true} className="modal fade" id="exampleModal-two" aria-labelledby="exampleModalLabel" role="dialog">
                <LoadingOverlay
                    active={isLoading}
                    spinner
                    text='Loading your content...'
                >

                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.history.push("/")}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h2>Login</h2>
                        <h5>Hi There! Nice to see you again.</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-10 mx-auto">
                                    <div className="form-group">
                                        <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" name="email" className="form-control" onChange={handleChange} aria-describedby="emailHelp" placeholder="Email" />
                                    </div>
                                    <span style={{ color: "red", fontSize: 12 }}>
                                        {errors.email}
                                    </span>
                                </div>

                            </div>



                            <div className="row">
                                <div className="col-md-10 mx-auto">
                                    <div className="form-group">
                                        <input type="password" name="password" className="form-control" onChange={handleChange} placeholder="Password" />
                                    </div>
                                    <span style={{ color: "red", fontSize: 12 }}>
                                        {errors.password}
                                    </span>
                                </div>
                            </div>

                            <div className="forgot-pass">
                                <Link to="/forgot" >Forgot Password?</Link>
                            </div>
                            <div className="subscribe-son">
                                <button type="submit">Login </button>
                            </div>
                        </form>
                    </div>
                </LoadingOverlay>
            </Modal>

            <FooterComponent />
        </>
    )
}
export default LoginComponents;