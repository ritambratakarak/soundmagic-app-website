import React, { useState, useEffect } from 'react';
import './../../Utils/Dashboard/style.css';
import './../../Utils/Dashboard/css/header.css';
import './../../Utils/Dashboard/css/bootstrap.min.css';
import group12 from './../../images/group12.jpg'
import Modal from "react-bootstrap/Modal";
import ReactPlayer from 'react-player';
import { ToastContainer, toast } from 'react-toastify';
import { Network } from './../../Services/Api';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import axios from "axios";


function WorkoutComponents(props) {
    const [flag, setFlag] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [invalid, setInvalid] = useState(false)
    const [message, setMessage] = useState('')
    const [data,setData] = useState([])
    const [date,setDate] = useState(new Date())
    const [showModal,setShowModal] = useState(false)

    const history = useHistory();


    const {  item } = props;

      /************************************************************************************/

    useEffect(() => {
       getWorkoutList()
       console.log('cat id',props.newId)       
       console.log(' id',props.item._id)


    }, []);

 /************************************************************************************/


    const getWorkoutList = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        setInvalid(false)
        setLoading(true);
    
        let header = {
            'authToken': user.authtoken
        }

        Network(`list-user-workout?workout_id=${props.item._id}&user_id=${user._id}&date=${moment(date).format('YYYY-MM-DD')}`, 'GET', header)
          .then(function (response) {
    
            setLoading(false);
            if (response.response_data.docs.length != 0) {
              setMessage('');
              setInvalid(false)
              setData(response.response_data.docs)
    
            } else {
              setInvalid(true)
              setMessage('Workout details not found.')
    
            }
          })
          .catch(function (error) {
            console.log('ggg', JSON.stringify(error));
            alert(JSON.stringify(error))
          });
      }
    
      /************************************************************************************/

      const diffTime = (startTime, endTime) => {
        var startTime = moment(startTime, "HH:mm a");
        var endTime = moment(endTime, "HH:mm a");
        var duration = moment.duration(endTime.diff(startTime));
    
        // duration in hours
        var hours = parseInt(duration.asHours());
    
        // duration in minutes
        var minutes = parseInt(duration.asMinutes());
    
        return Math.abs(minutes) + '' + 'min'
      }

      /************************************************************************************/
    const handleonClick = () => {
        if (flag) {
            
            setFlag(false)
        } else {
        //    onClick(item)
            setFlag(true)
        }
    }

          /************************************************************************************/

    const onDelete = async (ID) => {
        const user = JSON.parse(localStorage.getItem('user'));

        let formdata = new FormData();
          formdata.append('_id', ID);

       setLoading(true)
    
    axios({
        method: "POST",
        url: "https://nodeserver.mydevfactory.com:1446/api/delete-user-workout",
        headers: {
            //   'Content-Type': 'application/json',
            'x-access-token': user.authtoken
        },
        data: formdata
    }).then(function (response) {
        alert(response)
        setLoading(false)
        console.log("response===>", response.data.response_code);
        if (response.response_code == 2000) {
          alert(response.response_message);
             
        } else {
            alert(response.response_message)
        }
    }).catch((error) => {
        console.log("muutuja=======>", error);
    });
      }
    
    

    return (
        <>
            <div class="card-color">

            <ToastContainer autoClose={3000} />
                <div  id="headingOne">
                    <h2 class="mb-0">
                        <button class="btn btn-link" type="button" onClick={() => handleonClick()} data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <div class="row">
                                <div class="col-md-2 col-3 text-left " >
                                    <div class="rounded-circle card-icon-round">
                                    <img src={props.item.icon} class="img-fluid" alt="" />
                                    </div>
                                </div>
                                <div class="col-md-9 col-7">
                                    <h2>{props.item.name}</h2>
                                </div>
                                <div class="col-md-1 col-2">
                                    <i class="fa fa-chevron-down" aria-hidden="true"></i>
                                </div>
                            </div>
                        </button>
                    </h2>
                </div>


                {flag ?
                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body girl-one">
                            {/* <img src={girl_one} class="img-fluid" alt="" /> */}
                            <ReactPlayer url={'https://www.youtube.com/embed/' + props.item.video_url.split('=')[1]}
                             />
                             
                            <p class="text-white"> {props.item.description}</p>
                            {/* <img src={play_b} class="img-fluid" alt="" /> */}
                            <form>
                                {/* <div class="save-two">
                                    <button type="submit">ok <img src={vector} class="img-fluid" alt="" /></button>
                                </div> */}
                              
                                <table class="table table-striped">
                                    <tr>
                                        <th>Sets</th>
                                        <th>Reps</th>
                                        <th>Weight</th>
                                        <th>Rest time</th>
                                        <th>Duration</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    {data.length!=0  &&
                                     data.map((item)=>{
                                   return(
                                    <tr>
                                        <td >{item.sets}</td>
                                        <td>{item.repeat}</td>
                                        <td>{item.weight}kg</td>
                                        <td>{item.resting_time} min</td>
                                        <td>{diffTime(item.start_time,item.end_time)}</td>
                                        <td> 
                                        <div class="save-three">
                                    <button type="submit"
                                      onClick={()=>history.push({
                                        pathname: "/addworkoutexercise",
                                        state: {
                                          Id:props.item._id,
                                          catId:props.newId,
                                          editId:item._id,
                                          sets:item.sets,
                                          repeat:item.repeat,
                                          weight:item.weight,
                                          restingTime:item.resting_time,
                                          startTime:item.start_time,
                                          endTime:item.end_time
                                        },
                                      })}
                                    >Edit</button>
                                </div></td>
                                        <td>
                                        <div class="save-three">
                                    <button type="submit"
                                    onClick={()=>onDelete(item._id)}>Delete</button>
                                </div>
                                        </td>
                                    </tr>
                                    )})
                                   }

                                </table>
                                {invalid &&
                                <table class="table table-striped">
                              <tr>
                                    <td style={{textAlign:'center'}}>{message}</td>                                       
                                
                                        </tr>
                                        </table> }
                                        <div class="save-two text-center" >
                                    <button type="submit"
                                     onClick={()=>history.push({
                                        pathname: "/addworkoutexercise",
                                        state: {
                                          Id:props.item._id,
                                          catId:props.newId
                                        },
                                      })}
                                    >Add Workout</button>
                                </div>
                            </form>


                           
                        </div>
                    </div>
                    : null
                }
            </div>
        </>
    )
}

export default WorkoutComponents;