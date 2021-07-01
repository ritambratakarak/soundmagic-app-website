import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import './../../Utils/css/header.css'
import '../../Utils/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import OtpComponent from './../../Components/Comman/verify-otp'
import HeaderComponent from './../../Components/Comman/header';
import FooterComponent from './../../Components/Comman/footer';
import { Network } from './../../Services/Api';
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function ForgotComponents(props) {
    const [input, setInput] = useState({})
    const [errors, setError] = useState({})
    const [show, setShow] = useState(false);
    const [showSingup, setShowSingup] = useState(false);
    const [otpShow, setOtpShow] = useState(false)
    const [otp, setOtp] = useState('')
    const [email, setEmail] = useState('')
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
            setEmail(input['email'])
            var obj = {
                "email": input['email']
            }
            setLoading(true)

            Network('generate-fp-otp', 'post', obj)
                .then(async (res) => {
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
        setError(errors)

        return isValid;
    }



    const onSubmitOtp = () => {
        var obj = {
            "email": email,
            'forgot_password_otp': otp
        }

        Network('verify-fp-otp', 'post', obj)
            .then(async (res) => {
                console.log("res success verify otp--->", res);
                if (res.response_code == 2000) {
                    props.history.push({
                        pathname: '/resetPassword',
                        state: { id: res.response_data._id }
                    });
                } else {
                    toast.success(res.response_message)
                }
            })
            .catch((error) => {
                console.log("error===>", error)
            });
    }


    return (
        <>
            <ToastContainer />
            <HeaderComponent
                openModal={() => setShow(true)}
                openModalSingUp={() => setShowSingup(true)}
                
            />


            <OtpComponent
                show={otpShow}
                onClick={() => setOtpShow(false)}
                handleChange={(val) => setOtp(val)}
                onSubmitOtp={() => onSubmitOtp()}
            />

            <Modal show={true} className="modal fade" id="exampleModal-two" aria-labelledby="exampleModalLabel" role="dialog">
                <LoadingOverlay
                    active={isLoading}
                    spinner
                    text='Loading your content...'
                >

                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.history.replace("/")}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h2>Forgot password</h2>
                        {/* <h5>Hi There! Nice to see you again.</h5> */}
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


                            <div className="subscribe-son">
                                <button type="submit">save </button>
                            </div>
                        </form>
                    </div>
                </LoadingOverlay>
            </Modal>

            <FooterComponent />
        </>
    )
}
export default ForgotComponents;