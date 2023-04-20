import React from "react";
import "./style/About1.css";

import knowledge from "../../../assets/AboutPage/sharingknowledge.svg";

const About1 = () => {
  return (
    <div className="about1">
      <div className="about1__container">
        <div className="about1__container-content">
          <h1>We Share Knowledge With The World</h1>
        </div>
        <div className="about1__container-image">
          <img src={knowledge} alt="banner" />
        </div>
      </div>
    </div>
  );
};

export default About1;
