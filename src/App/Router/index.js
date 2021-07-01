import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeScreen from './../Screens/Home';         //....Home components.....
import NotFound from './../Error';
import Dashboard from './../Screens/Dashboard/Home/index';
import { useSelector } from 'react-redux';
import ForgotComponent from './../Components/Comman/forgot';
import ResetPassword from "./../Components/Comman/resetPass";
import LoginScreen from "./../Components/Comman/login";
import Signup from "./../Components/Comman/signup";


export const currentURL = '/projects/suvendu/vivek/Fit4YourSports';


function RouterScreen() {
    const userdata = useSelector((state) => state.userdata);
    const [userMe, setUser] = useState(null);
    const [userType, setUserType] = useState(null)

    

    useEffect(() => {
        let user = userdata && userdata._id ? true : false
        setUser(user);
        const userLocal = JSON.parse(localStorage.getItem('user'));
        let userD = userLocal && userLocal._id ? true : false
        console.log("userD====>", userLocal);
        let userTy = userLocal && userLocal.user_type == 'user' ? true : false
        setUserType(userTy)
        setUser(userD);
    }, [userdata]);

    //basename={currentURL}

    return (
        <Router>
            <div>
                <Switch>
                    {
                        userMe ?
                            <>  
                                <Route path='/' component={Dashboard} exact />
                            </>
                            :
                            <>
                                <Route path='/' component={HomeScreen} exact />
                                <Route path='/login' component={LoginScreen} />
                                <Route path='/signup' component={Signup} />
                                <Route path='/resetPassword' component={ResetPassword} />
                            </>

                    }
                    <Route component={NotFound} />
                </Switch >

            </div>
        </Router >



    );
}

export default RouterScreen;
