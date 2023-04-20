import React from "react";
import "./style/About3.css";
import { ReviewCard } from "../../../component/Cards/ReviewCard";

import person1 from "../../../assets/AboutPage/person1.jfif";
import person2 from "../../../assets/AboutPage/person2.jfif";
import person3 from "../../../assets/AboutPage/person3.jfif";

const About3 = () => {
  return (
    <div className="about3">
      <div className="about3__container">
        <h1>Professional Reviews</h1>
        <div className="about3__container-content">
          <ReviewCard
            image={person1}
            title={"UI/UX designer"}
            name={"Akon Cilvi"}
          />
          <ReviewCard
            image={person2}
            title={"Data Analyst"}
            name={"MS Dhoni"}
          />
          <ReviewCard
            image={person3}
            title={"Fitness Trainer"}
            name={"Washington DC"}
          />
        </div>
      </div>
    </div>
  );
};

export default About3;
