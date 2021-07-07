import React, { useState, useEffect } from "react";
import "../../Utils/style.css";
import "./../../Utils/css/header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "./../../Components/Comman/header";
import FooterComponent from "./../../Components/Comman/footer";
import "./../../Utils/css/bootstrap.min.css";

export default function Profile() {
  const [show, setShow] = useState(false);
  const onClick = () => {
    setShow(!show);
  };
  return (
    <>
      <HeaderComponent show={show} onClick={onClick} dashboard={false} />
        
      <FooterComponent />
    </>
  );
}
