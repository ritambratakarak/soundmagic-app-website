import React, { useState, useEffect } from 'react';
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

function ResetComponents(props) {
    const [input, setInput] = useState({})
    const [errors, setError] = useState({})
    const [show, setShow] = useState(false);
    const [showSingup, setShowSingup] = useState(false);
    const [otpShow, setOtpShow] = useState(false)
    const [otp, setOtp] = useState('')
    const [email, setEmail] = useState('')
    const [userId, setUserid] = useState("")
    const [isLoading, setLoading] = useState(false)
    //.........for on change mether.............

    useEffect(() => {

        let Paramvalue = props.location.state.id;
        console.log("Paramvalue-->", Paramvalue);
        setUserid(Paramvalue)

    }, []);

    const handleChange = (event) => {
        let input1 = input;
        input1[event.target.name] = event.target.value;
        console.log(input1)
        setInput(input1)
    }

    const handleSubmit = (event) => {

        if (validate()) {
            var obj = {
                "id": userId,
                "password": input["password"]
            }
            setLoading(true)


            Network('reset-password', 'post', obj)
                .then(async (res) => {
                    console.log("res success generate otp forgot pass--->", res);
                    setLoading(false)
                    if (res.response_code == 2000) {
                        props.history.push('/');
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






    return (
        <>
            <ToastContainer />

            <HeaderComponent
                openModal={() => setShow(true)}
                openModalSingUp={() => setShowSingup(true)}
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
                        <h2>Reset password</h2>

                        {/* <h5>Hi There! Nice to see you again.</h5> */}

                        <form onSubmit={handleSubmit}>
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
export default ResetComponents;