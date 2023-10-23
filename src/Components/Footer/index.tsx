import React from "react";
import "./style.scss";
// import { faInstagram } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ninja from "../../assets/cat.png";

function Footer() {
  return (
    <div className="footer">
      <div className="contacts">
        <div className="logo">
          <img alt={"ninja"} src={ninja} />
        </div>
        <div className="email">
          <p>Email me</p>
          <span>contact@nutsamargvelashvili.info</span>
        </div>
        <div className="social">
          <p>Follow me</p>
          <div className={"links"}>
            <div className="pentagon">
              <FontAwesomeIcon icon={faInstagram} />
            </div>
            <div className="pentagon">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </div>
            <div className="pentagon">
              <FontAwesomeIcon icon={faFacebookF} />
            </div>
          </div>
        </div>
        <div className="call">
          <p>Call me</p>
          <p className={"number"}> (+995) 599 051 750</p>
        </div>
      </div>
      <div className={"copyright"}>
        <hr />
        Copyright @ 2023 Nutsa Margvelashvili | All Rights Reserved
      </div>
    </div>
  );
}

export default Footer;
