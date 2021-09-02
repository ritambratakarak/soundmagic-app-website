import React, { useState, useEffect, useRef } from "react";
import "../../Utils/style.css";
import "./../../Utils/css/header.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "../../Components/Comman/header";
import FooterComponent from "../../Components/Comman/footer";
import "./../../Utils/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/Actions/auth";
import { toast } from "react-toastify";
import { Network } from "../../Services/Api";
import LoadingOverlay from "react-loading-overlay";
import banner from "../../images/inner-banner.png";
import favorite from "../../images/menu5.png";
import addfavorite from "../../images/heart_fill.png";
import {
  addFavorite,
  removeFavorite,
} from "../../Redux/Actions/favoriteaction";
import video1 from '../../images/video1.png';
import video2 from '../../images/video2.png';
import stretch from '../../images/streach.png';
import play from '../../images/play.png';
import about_image from '../../images/about-video.png';

export default function Contact(props) {
  const dispatch = useDispatch();
  const imgRef = useRef();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [subject, setsubject] = useState("");
  const [message, setmessage] = useState("");

  const onClick = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) != null) {
     
    } else {
      props.history.push("/login");
    }
  }, []);

  const submit = (event) => {
    if (name == "") {
      toast.warn("Name cannot blank");
    } else if (email == "") {
      toast.warn("Email cannot blank");
    } else if (phone == "") {
      toast.warn("phone cannot blank");
    } else if (subject == "") {
      toast.warn("subject cannot blank");
    } else if (message == "") {
      toast.warn("Message cannot blank");
    } else {
      const alldata = JSON.parse(localStorage.getItem("user"));
      const authtoken = alldata.authtoken;
      var obj = {
        name: name,
        email: email,
        phone: phone,
        subject,
        message,
        authtoken,
      };
      Network("contact-to-admin", "post", obj)
        .then(async (res) => {
          console.log(res);
          if (res.response_code == 200) {
            setLoading(false);
            toast.success(res.message);
          } else if (res.response_code == 5010) {
            setLoading(false);
            toast.warn(res.response_message);
          } else {
            setLoading(false);
            toast.warn(res.response_message);
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Something went wrong !");
          console.log("error===>", error);
        });
    }
    event.preventDefault();
  };  

  return (
    <>
      <LoadingOverlay active={loading} spinner text="Loading your content...">
        <HeaderComponent show={show} onClick={onClick} dashboard={true} />
        <div className="banner">
          <img src={banner} alt="" />
          <div className="banner-text">
            <div className="container">
              <div className="banner-text-inner">
              <h3>Contact Us</h3>
              <p>Welcome to Mindfulness Haven. <br/>Access relaxing sounds different guided meditations, relaxation and yoga.</p>
              </div>
            </div>
          </div>
        </div>
        
        
        <div class="contact-page">
          <div class="container">
              <h2>Have a Question?</h2>
              <h4>Send message for us</h4>
              <div class="row">
                  <div class="col-lg-8">
                      <div class="contact-form">
                      <form
                         
                          onSubmit={submit}
                        >
                         <div class="two-row">
                             <div class="input-filed">
                                 <input type="text" placeholder="Name" class="input" onChange={(e) => setname(e.target.value)}
                                  value={name == "" ? "" : name} />
                             </div>
                             <div class="input-filed">
                                 <input type="text" placeholder="Email" class="input" onChange={(e) => setemail(e.target.value)}
                                  value={email == "" ? "" : email}/>
                             </div>
                         </div> 
                          <div class="two-row">
                             <div class="input-filed">
                                 <input type="text" placeholder="Phone number" class="input" onChange={(e) => setphone(e.target.value)}
                                  value={phone == "" ? "" : phone}/>
                             </div>
                             <div class="input-filed">
                                 <input type="text" placeholder="Subject" class="input" onChange={(e) => setsubject(e.target.value)}
                                  value={subject == "" ? "" : subject}/>
                             </div>
                         </div>
                         <div class="textarea-section">
                             <textarea placeholder="Message" class="textarea-input" onChange={(e) => setmessage(e.target.value)}
                                  value={message == "" ? "" : message}></textarea>
                         </div>
                         <button class="submit">SUBMIT</button>
                         </form>
                      </div>
                  </div>
                  <div class="col-lg-4">
                      <div class="contact-details">
                          <div class="contact-list address">
                              <h3>POSTAL ADDRESS</h3>
                              <p>Mindfulness Haven Drumsheel Lower, Cong, Co. Mayo Ireland</p>
                          </div>
                           <div class="contact-list phone">
                              <h3>Phone Number</h3>
                              <p>+123 987 456 3210</p>
                          </div>
                           <div class="contact-list email">
                              <h3>Email Address</h3>
                              <p>info@soundmagic.com</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="map-section">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2385.264619476569!2d-9.04631208446479!3d53.28479468702136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485b9731064bfd97%3A0x6718a781206d9e3f!2sMindfulness%20Haven%20Galway!5e0!3m2!1sen!2sin!4v1630574382994!5m2!1sen!2sin"  allowfullscreen="" loading="lazy" class="map"></iframe>
              </div>
          </div>
      </div>
        
      
        
      </LoadingOverlay>
      <FooterComponent />
    </>
  );
}
