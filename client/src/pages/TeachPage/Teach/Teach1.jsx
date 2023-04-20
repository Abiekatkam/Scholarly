import React from "react";
import "./style/Teach1.css";

import teach1 from "../../../assets/TeachPage/teach1.svg";
import LinkButton from "../../../component/Buttons/LinkButton";

const Teach1 = () => {
  return (
    <div className="teach1">
      <div className="teach1__container">
        <div className="teach1__container-content">
          <h1>Come Teach With Us.</h1>
          <p>Become an instructor and change lives — including your own</p>
          <LinkButton link={"/auth/mentor/register"} text={"Get Started"} />
        </div>
        <div className="teach1__container-image">
          <img src={teach1} alt="banner" />
        </div>
      </div>
    </div>
  );
};

export default Teach1;
