import React from "react";
import "./style/Teach2.css";

import card1 from "../../../assets/TeachPage/getrewarded.jpg";
import card2 from "../../../assets/TeachPage/inspirelearners.jpg";
import card3 from "../../../assets/TeachPage/teachyourway.jpg";

const Teach2 = () => {
  return (
    <div className="teach2">
      <div className="teach2__container">
        <h1>So Many Reasons To Start</h1>
        <div className="teach2__container-content">
          <div className="teach2__container-content-card">
            <img src={card1} alt="img2" />
            <h3>Teach your way</h3>
            <p>
              Publish the course you want, in the way you want, and always have
              control of your own content.
            </p>
          </div>
          <div className="teach2__container-content-card">
            <img src={card2} alt="img2" />
            <h3>Inspire Learners</h3>
            <p>
              Teach what you know and help learners explore their interests,
              gain new skills, and advance their careers.
            </p>
          </div>
          <div className="teach2__container-content-card">
            <img src={card3} alt="img2" />
            <h3>Get Rewarded</h3>
            <p>
              Expand your professional network, build your expertise, and earn
              money on each paid enrollment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teach2;
