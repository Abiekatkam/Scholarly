import React from "react";
import "./style/Home5.css";

import teachonline from "../../../assets/HomePage/teachon.svg";
import transform from "../../../assets/HomePage/transform.svg";
import LinkButton from "../../../component/Buttons/LinkButton";

const Home5 = () => {
  return (
    <div className="home5">
      <div className="home5__container">
        <div className="home5__container-content">
          <img src={teachonline} alt="teach on" />
          <div className="home5__container-content--data">
            <h1>Become an instructor</h1>
            <p>
              Instructors from around the world teach millions of students on
              Scholarly. We provide the tools and skills to teach what you love.
            </p>
            <LinkButton text={"Start teaching today"} link={"/teach"} />
          </div>
        </div>
        <div className="home5__container-content">
          <div className="home5__container-content--data">
            <h1>Transform your life through education</h1>
            <p>
              Learners around the world are launching new careers, advancing in
              their fields, and enriching their lives.
            </p>
            <LinkButton text={"Find out how"} link={"/about"} />
          </div>
          <img src={transform} alt="teach on" />
        </div>
      </div>
    </div>
  );
};

export default Home5;
