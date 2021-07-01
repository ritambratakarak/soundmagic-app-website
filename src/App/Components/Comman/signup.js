import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import './../../Utils/css/header.css'
import './../../Utils/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import countryCode from './../Comman/country.json'
import './../../Utils/css/bootstrap.min.css'
import OtpComponent from './../../Components/Comman/verify-otp'
import HeaderComponent from './../../Components/Comman/header';
import FooterComponent from './../../Components/Comman/footer';
import { Network } from './../../Services/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingOverlay from 'react-loading-overlay';



function SignUpComponents(props) {
    const [input, setInput] = useState({})
    const [errors, setError] = useState({})
    const [otp, setOtp] = useState('')
    const [otpShow, setOtpShow] = useState(false)
    const [isLoading, setLoading] = useState(false)

    //.........for on change mether.............

    const handleChange = (event) => {
        let input1 = input;
        input1[event.target.name] = event.target.value;
        console.log(input1)
        setInput(input1)
    }

    //.........Login submit............

    const handleSubmit = (event) => {

        if (validate()) {

            const obj = {
                "email": input['email'],
                "password": input['password'],
                "apptype": "ANDROID",
                "fname": input['firstName'],
                "lname": input['lastName'],
                "phone_no": input['mobile'],
                "country_code": input['numberCode']
            }
            setLoading(true)

            Network('register', 'post', obj)
                .then(async (res) => {
                    console.log("res success register--->", res);
                    if (res.response_code == 2000) {
                        setOtpShow(true)
                        toast.success(res.response_message)
                        setLoading(false)
                    }
                })
                .catch((error) => {
                    console.log("error===>", error)
                    setLoading(false)
                });

        }
        event.preventDefault();
    }

    const validate = () => {
        let input1 = input;
        let errors = {};
        let isValid = true;

        if (!input1["firstName"]) {
            isValid = false;
            errors["firstName"] = "Please enter your first name.";
        }

        if (!input1["lastName"]) {
            isValid = false;
            errors["lastName"] = "Please enter your last name.";
        }

        if (!input1["mobile"]) {
            isValid = false;
            errors["mobile"] = "Please enter your mobile number.";
        }

        if (!input1["confPassword"]) {
            isValid = false;
            errors["confPassword"] = "Please enter your confirm password.";
        }

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

        if (input1["confPassword"] == input1["password"]) {
            isValid = true
        } else {
            isValid = false;
            errors["confPassword"] = "Passwords do not match.";
        }

        setError(errors)

        return isValid;
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
                    setLoading(false)
                    toast.error(res.response_message)
                }
            })
            .catch((error) => {
                setLoading(false)
                console.log("error===>", error)
            });
    }



    return (
        <>
            <HeaderComponent
                
                
            />

            <ToastContainer />

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

                    <div className="modal-header" >
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.history.push("/")}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-10 mx-auto regis-menu">
                                <h2>Registration</h2>
                                <h5>Please sign up to enter in a app.</h5>
                                {/* <ul>
                                <li><a href="#" className="active">As A Players/Athletes</a></li>
                                <li><a href="#">As A Trainer</a></li>
                            </ul> */}
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-10 mx-auto">
                                    <div className="form-group">
                                        <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" type="text" className="form-control" onChange={handleChange} name="firstName" aria-describedby="emailHelp" placeholder="First Name" />
                                    </div>
                                    <span style={{ color: "red", fontSize: 12 }}>
                                        {errors.firstName}
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-10 mx-auto">
                                    <div className="form-group">
                                        <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" type="text" className="form-control" onChange={handleChange} name="lastName" aria-describedby="emailHelp" placeholder="Last Name" />
                                    </div>
                                    <span style={{ color: "red", fontSize: 12 }}>
                                        {errors.lastName}
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-10 mx-auto">
                                    <div className="row">
                                        <div className="col-md-3 col-4">
                                            <select onChange={handleChange} name="numberCode">
                                                {
                                                    countryCode.map((item) => {
                                                        return (
                                                            <option value={item.dial_code} name="numberCode">{item.dial_code}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-9 col-8">
                                            <div className="form-group">
                                                <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" type="text" className="form-control" onChange={handleChange} name='mobile' placeholder="Mobile Number" />
                                            </div>
                                            <span style={{ color: "red", fontSize: 12 }}>
                                                {errors.mobile}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-10 mx-auto">
                                    <div className="form-group">
                                        <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" className="form-control" onChange={handleChange} name="email" placeholder="Email Id" />
                                    </div>
                                    <span style={{ color: "red", fontSize: 12 }}>
                                        {errors.email}
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-10 mx-auto">
                                    <div className="form-group">
                                        <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" type="password" className="form-control" onChange={handleChange} name='password' placeholder="Password" />
                                    </div>
                                    <span style={{ color: "red", fontSize: 12 }}>
                                        {errors.password}
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-10 mx-auto">
                                    <div className="form-group">
                                        <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" type="password" className="form-control" onChange={handleChange} name='confPassword' placeholder="Confirm Password" />
                                    </div>
                                    <span style={{ color: "red", fontSize: 12 }}>
                                        {errors.confPassword}
                                    </span>
                                </div>
                            </div>
                            <div className="subscribe-son mt-4">
                                <button type="submit">Submit </button>
                            </div>
                        </form>
                    </div>
                </LoadingOverlay>
            </Modal>
            <FooterComponent />
        </>
    )
}
export default SignUpComponents;