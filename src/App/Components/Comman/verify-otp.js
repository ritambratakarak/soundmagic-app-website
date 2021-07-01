import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import './../../Utils/css/header.css'
import '../../Utils/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function OtpComponents(props) {
    const [otp, setOtp] = useState('')


    const handleChange = otp => {
        props.handleChange(otp)
        setOtp(otp)
    }

    return (
        <>
            <Modal show={props.show} className="modal fade" id="exampleModal-two" aria-labelledby="exampleModalLabel" role="dialog">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.onClick()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <h2>verify-otp</h2>
                    <div style={{ alignItems: 'center', display: "flex", justifyContent: 'center', height: 200 }}>
                        


                    </div>
                    <div className="subscribe-son">
                        <button type="submit" onClick={()=> props.onSubmitOtp()}>Save</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default OtpComponents;