import React, { useState, useEffect } from 'react';
import './../../../Utils/Dashboard/style.css';
import './../../../Utils/Dashboard/css/header.css';
import './../../../Utils/Dashboard/css/bootstrap.min.css';
import FooterComponent from './../../../Components/Comman/footer';
import HeaderComponent from './../Header/index'
import { Network } from './../../../Services/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay';
import { useDispatch } from 'react-redux';
import { logoutUser } from "./../../../Redux/Actions/auth";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import moment from 'moment';


const now = new Date();
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


function HomeComponent(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [goalList, setGoalList] = useState([])
    const [isLoading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [selected, setselected] = useState('')
    const [value, onChange] = useState(new Date());
    const [selectedOne, setSelectedOne] = useState(new Date());
    const [isDoneStatus, setDoneStatus] = useState('')
    const [calendarEvents, setCalendarEvents] = useState([])



    const events = [
        {
            id: 0,
            title: 'All Day Event very long title',
            // allDay: true,
            start: now,
            end: now,
        },

    ]

    useEffect(() => {
        
        
    }, []);



    


    


    


    /********************************************************************************/

    const eventStyleGetter = (event, start, end, isSelected) => {
        var backgroundColor = 'red';
        var style = {
            backgroundColor: event.title == 'Not done' ? backgroundColor : 'green',
            borderRadius: '5px',
            opacity: 0.8,
            color: '#fff',
            border: '0px',
            display: 'block',
            height: '36px',
        };
        return {
            style: style
        };
    }

    const eventSelected = (event) => {
        
        
        setSelectedOne(event);
    }

    /*********************************************************************************/

    var number = 100;
    //The percent that we want to get.
    //i.e. We want to get 50% of 120.
    var percentToGet = 100 * isDoneStatus / goalList.length;

    //Calculate the percent.
    var percent = (percentToGet / 100) * number;

    /*********************************************************************************/

    const percentage = percent ? parseInt(percent) : 0;


    return (
        <>
            <LoadingOverlay
                active={isLoading}
                spinner
                text='Loading your content...'
            >
                <HeaderComponent dashboard={true} />

                <ToastContainer />

                

                <FooterComponent />
            </LoadingOverlay>
        </>
    )
}

export default HomeComponent;