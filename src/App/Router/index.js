import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeScreen from './../Screens/Home';         //....Home components.....
import NotFound from './../Error';
import Dashboard from './../Screens/Dashboard/Home/index';
import { useSelector } from 'react-redux';
import Forgotpassword from './../Screens/ForgotPassword/index';
import LoginScreen from "./../Screens/Login/index";
import Signup from "./../Screens/Register/index";
import { ToastBox } from '../Components/Toast';
import Profile from '../Screens/Profile';
import Track from '../Screens/Track';
import TrackDetails from '../Screens/Track/Details';
import Player from '../Screens/Player';
import BlogDetails from '../Screens/Blog';
import About from '../Screens/About';
import Contact from '../Screens/Contact';
import Courses from '../Screens/Courses';
import RecentPlayed from '../Screens/Recent Played';
import MyFavorite from '../Screens/Favorite';
import Terms from '../Screens/Terms';


export const currentURL = '/projects/suvendu/ritam/soundmagic';

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
        <Router basename={currentURL}>
            <ToastBox align="top-center" />
            <div>
                <Switch>
                    {
                        <>
                            <Route path='/' component={HomeScreen} exact />
                            <Route path='/login' component={LoginScreen} />
                            <Route path='/signup' component={Signup} />
                            <Route path='/forgotpassword' component={Forgotpassword} />
                            <Route path='/profile' component={Profile} />
                            <Route path='/track' component={Track} />
                            <Route path='/about' component={About} />
                            <Route path='/contact' component={Contact} />
                            <Route path='/courses' component={Courses} />
                            <Route path='/trackdetails' component={TrackDetails} />
                            <Route path='/recentplayed' component={RecentPlayed} />
                            <Route path='/myfavorite' component={MyFavorite} />
                            <Route path='/player' component={Player} />
                            <Route path='/blogdetails' component={BlogDetails} />
                            <Route path='/terms' component={Terms} />
                        </>
                    }
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}

export default RouterScreen;
