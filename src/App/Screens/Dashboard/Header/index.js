import React, { useState, useEffect } from 'react';
import './../../../Utils/Dashboard/style.css';
import './../../../Utils/Dashboard/css/header.css';
import './../../../Utils/Dashboard/css/bootstrap.min.css';
import Logo from './../../../images/Logo.png'


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logoutUser } from "./../../../Redux/Actions/auth"


function HeaderComponents(props) {
    const [user, setUser] = useState({})
    const dispatch = useDispatch()



    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user'));
        console.log("user----->", user)
        setUser(user)

    }, []);

    const handleLogout = (event) => {
        if(event.target.value == '1'){
            const userRemove = localStorage.removeItem('user')
            console.log("userRemove", userRemove);
            dispatch(logoutUser())
        }
    }


    return (
        <header id="home-menu" className="admin-menu">
            <div className="container" id="navv">
                <div className="row">
                    <div className="col-lg-3 col-md-10 col-10" id="bannar-logo">
                        <a href="index.html">
                            <img src={Logo} className="img-fluid" />
                        </a>
                    </div>


                    <div className="col-2 col-md-2 text-right show--mobile--only">
                        <ul>
                            <li className="mob-only-menu text-right">
                                <a href="#">
                                    <i className="fa fa-bars mob-menu threebar"></i>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-9 col-md-12 col-12 mob-manubarr">
                        <ul className="ulone">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/workout">Workout Programs</Link></li>
                            <li><Link to="/subscription">Subscribe</Link></li>
                            <li>
                                <figure style={{ marginLeft: 200 }}>
                                    
                                    <img src={"./../../../images/header-account.png"} className="img-fluid" alt="" />                                    
                                </figure>
                            </li>
                            <li id="sign-btn">
                                <select onChange={(event)=> handleLogout(event)}>
                                    <option style={{ color: "#000" }} value="0">{user && user.fname +" "+ user.lname}</option>
                                    <option style={{ color: "#000" }} value="1">Log out</option>                                   
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderComponents;
