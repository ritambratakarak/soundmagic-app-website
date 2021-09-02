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
import video1 from "../../images/video1.png";
import video2 from "../../images/video2.png";
import stretch from "../../images/streach.png";
import play from "../../images/play.png";
import about_image from "../../images/about-video.png";

export default function Terms(props) {
  const dispatch = useDispatch();
  const imgRef = useRef();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trackdata, settrackdata] = useState([]);
  const [playeddata, setplayeddata] = useState([]);
  const [alltrack, setalltrack] = useState(4);
  const [newtrack, setnewtrack] = useState(4);
  const [mostplaytrack, setmostplaytrack] = useState(4);
  const favoritedata = useSelector((state) => state.favorite);

  const onClick = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) != null) {
      getTrack();
      getMostPalyedTrack();
    } else {
      props.history.push("/login");
    }
  }, []);

  useEffect(() => {
    if (favoritedata != null) {
      if (favoritedata?.favorite != null) {
        getTrack();
        dispatch(addFavorite(null));
      }
    }
  }, [favoritedata]);

  const getTrack = async () => {
    setLoading(true);
    const alldata = JSON.parse(localStorage.getItem("user"));
    const authtoken = alldata.authtoken;
    Network(`get-track-list`, "get", { authtoken })
      .then(async (res) => {
        setLoading(false);
        if (res.response_code === 200) {
          console.log("track data", res.response_data);
          settrackdata(res.response_data.docs);
        } else if (res.response_code === 4000) {
          toast.warn(res.response_message);
          localStorage.removeItem("user");
          dispatch(logoutUser());
        } else {
          toast.warn(res.response_message);
        }
      })
      .catch((error) => {
        toast.error(error);
        setLoading(false);
      });
  };

  const getMostPalyedTrack = async () => {
    setLoading(true);
    const alldata = JSON.parse(localStorage.getItem("user"));
    const authtoken = alldata.authtoken;
    Network(`get-user-recent-play?sortby=1`, "get", { authtoken })
      .then(async (res) => {
        setLoading(false);
        if (res.response_code === 200) {
          console.log("most played data", res.response_data);
          setplayeddata(res.response_data.docs);
        } else if (res.response_code === 4000) {
          toast.warn(res.response_message);
          localStorage.removeItem("user");
          dispatch(logoutUser());
        } else {
          toast.warn(res.response_message);
        }
      })
      .catch((error) => {
        toast.error(error);
        setLoading(false);
      });
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
                <h3>Terms &amp; Conditions</h3>
                <p>
                  Welcome to Mindfulness Haven. <br />
                  Access relaxing sounds different guided meditations,
                  relaxation and yoga.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="video-track-section">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="video-track-text">
                <h3>Mindfulness Haven Privacy Policy</h3>
<p></p>
<p>Privacy Policy Last Updated June 19, 2021</p>
<p></p>
<p>Thank you for using MindfulnessHaven.com, a service of Sound Magic Ireland</p>
<p></p>
<p>We respect and protect your privacy and are committed to following best practices.</p>
<p></p>
<p>Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with the MindfulnessHaven.com web and mobile applications,</p>
<p></p>
<p>By accessing or using the Services, you agree to this Privacy Policy and our Terms of Service.</p>
<p></p>
<p>What personal information do we collect from the people that visit our blog, website or app?</p>
<p></p>
<p>When ordering or registering on our site, as appropriate, you may be asked to enter your name, email address, mailing address, phone number or other details to help you with your experience.</p>
<p></p>
<p>The information we collect from you depends on how you use the Services and what information you choose to provide or make available to us.</p>
<p></p>
<p>When do we collect information?</p>
<p></p>
<p>· We collect information from you when you register on our site, place an order, subscribe to a newsletter, respond to a survey, fill out a form, Use Live Chat, Open a Support Ticket or enter information on our site.</p>
<p></p>
<p>· Create or register an account, and when you administer your account</p>
<p></p>
<p>· Input information or data into any of our Services, or post or upload Content to our Services</p>
<p></p>
<p>· Submit questions, requests, other communications to us via forms, email, or other communication media</p>
<p></p>
<p>· Contact us for customer support or technical support</p>
<p></p>
<p>· Visit any our website or download our app</p>
<p></p>
<p>· Participate in any promotions, demonstrations, contests, surveys, or other marketing events</p>
<p></p>
<p>How do we use your information?</p>
<p></p>
<p>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:</p>
<p></p>
<p>•To provide service for you</p>
<p></p>
<p>• To improve our website or App in order to better serve you.</p>
<p></p>
<p>• To allow us to better service you in responding to your customer</p>
<p></p>
<p>service requests.</p>
<p></p>
<p>• To administer a contest, promotion, survey or other site feature.</p>
<p></p>
<p>• To quickly process your transactions.</p>
<p></p>
<p>• To ask for ratings and reviews of services or products</p>
<p></p>
<p>• To follow up with them after correspondence (live chat, email, or</p>
<p></p>
<p>phone inquiries) or to share our newsletter with you.</p>
<p></p>
<p>· To contact you to provide product updates and information about the products you have requested or purchased;</p>
<p></p>
<p>· To marketing our products, services and features that you may be interested in, and monitoring the performance of our advertisements and marketing efforts;</p>
<p></p>
<p>· To create or administering your account, including identifying you with your account or the account of a Solace Lifesciences, Inc. customer;</p>
<p></p>
<p>· To secure the Services and our systems, and protecting your information and data;</p>
<p></p>
<p>Can change your personal information:</p>
<p></p>
<p>• By emailing us</p>
<p></p>
<p>• By logging in to your account</p>
<p></p>
<p>• By chatting with us or by sending us a support ticket.</p>
<p></p>
<p>You may access, correct, amend, or delete Customer Information we have about you by logging into your account and using the applicable site features. If you wish to cancel your account and delete all of your Customer Information, please contact support. We will then delete your Customer Information within 30 days.</p>
<p></p>
<p>Our general data retention policy is to keep all of your Customer Information that you do not delete for as long as you maintain your account with us, and we will delete your Customer Information within 30 days after you close your account.</p>
<p></p>
<p>We may use some of the information we collect for marketing purposes, including to send you promotional communications about new Solace Lifesciences, Inc. features, products, events, or other opportunities. If you want to stop receiving these communications or to opt out of our using your information for these purposes, follow the opt-out instructions by clicking “Unsubscribe” (or similar opt-out language) in those communications. You can also contact customer support to opt-out.</p>
<p></p>
<p>Information from Children</p>
<p></p>
<p>Sound Magic Ireland is directed to children under the age of 13 but we do not collect any personal information from children.</p>
<p></p>
<p>How We Share Information</p>
<p></p>
<p>We may disclose the information we collect in the following cases:</p>
<p></p>
<p>· You asked us to, or otherwise gave your specific consent;</p>
<p></p>
<p>· With vendors we engage to provide you with aspects of the Services, such as data storage, hosting, and payment processing;</p>
<p></p>
<p>· With third-party service providers who enable certain features or functionalities of the Services that you’ve requested;</p>
<p></p>
<p>· With vendors we engage to help us gain insights and analytics into how the Services are used and how they might be improved (for example, we may use third-party data enrichment services to match Customer Information or other personally identifiable information we collect with publicly available database information in order to communicate more effectively with you);</p>
<p></p>
<p>· As necessary to comply with applicable law, including governmental requests, law enforcement requests, and otherwise to protect the rights, privacy, safety, or property of you, us, or others;</p>
<p></p>
<p>· As necessary in the event of a proposed or actual reorganization, merger, sale, joint venture, assignment, transfer, financing, or other disposition of all or any portion of Solace Lifesciences, Inc. business, assets, or equity; and</p>
<p></p>
<p>· With others for any legitimate business purpose.</p>
<p></p>
<p>How do we protect your information?</p>
<p></p>
<p>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible.</p>
<p></p>
<p>We use regular Malware Scanning.</p>
<p></p>
<p>Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>
<p></p>
<p>We implement a variety of security measures when a user places an order enters, submits, or accesses their information to maintain the safety of your personal information.</p>
<p></p>
<p>All transactions are processed through a gateway provider and are not stored or processed on our servers.</p>
<p></p>
<p>Do we use 'cookies' and how to turn it off?</p>
<p></p>
<p>Yes. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information. For instance, we use cookies to help us remember and process the items in your shopping cart. They are also used to help us understand your preferences based on previous or current site activity, which enables us to provide you with improved services. We also use cookies to help us compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.</p>
<p></p>
<p>We use cookies to:</p>
<p></p>
<p>• Help remember and process the items in the shopping cart.</p>
<p></p>
<p>• Understand and save user's preferences for future visits.</p>
<p></p>
<p>• Keep track of advertisements.</p>
<p></p>
<p>• Compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future. We may also use trusted third-party services that track this information on our behalf.</p>
<p></p>
<p>You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since browser is a little different, look at your browser's Help Menu to learn the correct way to modify your cookies.</p>
<p></p>
<p>If you turn cookies off, Some of the features that make your site experience more efficient may not function properly. It won't affect the user's experience that makes your site experience more efficient and may not function properly.</p>
<p></p>
<p>Third-party disclosure</p>
<p></p>
<p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential. We may also release information when it's release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property or safety.</p>
<p></p>
<p>Third-party links</p>
<p></p>
<p>We do not include or offer third-party products or services on our website and App.</p>
<p></p>
<p>We agree to the following:</p>
<p></p>
<p>Users can visit our site anonymously.</p>
<p></p>
<p>Once this privacy policy is created, we will add a link to it on our home page or as a minimum, on the first significant page after entering our website.</p>
<p></p>
<p>Our Privacy Policy link includes the word 'Privacy' and can easily be found on the page specified above.</p>
<p></p>
<p>Changes to Privacy Policy</p>
<p></p>
<p>Any information that we collect is subject to the Privacy Policy in effect at the time such information is collected. We may, however, revise the Privacy Policy from time to time. If a revision is material, as determined solely by us, we will notify you, for example via email. The current version will always be posted to our Privacy Policy page.</p>
<p></p>
<p>If you have any questions about this Privacy Policy, or wish to exercise any of your privacy rights, please contact customer support.</p>
<p></p>
<p>Customer Information</p>
<p></p>
<p>Information related to the creation of accounts is what we call “Customer Information.” Customer Information may include certain “personally identifiable information” or “PII,” such</p>
<p></p>
<p>as your name, email address, postal address and phone number. It also may include payment information, such as payment method, credit card information, and any contact information (such as name and postal address) associated with payment billing information.</p>
<p></p>
<p>When you create an account with Sound Magic Ireland on the Mindfulness Haven app or website, we may collect certain Customer Information directly from you or, if you create your account using a third-party service (such as Google, Facebook or Apple), we may collect Customer Information about you from the third-party service (such as your username or user ID associated with that third-party service). By choosing to create an account using a third-party service, you authorize us to collect Customer Information necessary to authenticate your account with the third-party service provider.</p>
<p></p>
<p>We collect information about how you use the Services and your actions on the Services, including IP addresses, what software and hardware you use (such as browser types, operating systems, ISPs, platform type, device type, mobile device identifiers such as make and model, mobile carrier), pages or features of Sound Magic Ireland mobile app and website used and associated dates and time stamps, search terms, links you click. We may also use tools, including third-party tools, to collect analytics data. Some of this information is collected through the use of “cookies” and other tracking technologies, such as web beacons and similar technologies (“tracking technologies”). We may also work with third-party partners to employ tracking technologies. We may also analyze metadata related to your use of the services (such as total number of sessions, etc.)</p>
<p></p>
<p>Aggregated and Anonymized Information</p>
<p></p>
<p>We may collect information by aggregating and anonymizing other information. The aggregation and anonymization process prevents the information from being reassociated or identified with any one customer account, user, or individual. We may use aggregated and anonymized information for a wide variety of statistical, analytical and marketing purposes such as publishing a report that reflects aggregated statistics regarding Mindfulness Haven App use</p>

                </div>
              </div>
            </div>
          </div>
        </div>

        
      </LoadingOverlay>
      <FooterComponent />
    </>
  );
}
