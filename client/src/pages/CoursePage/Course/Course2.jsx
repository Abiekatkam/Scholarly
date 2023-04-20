import React from "react";
import { ReviewCard } from "../../../component/Cards/ReviewCard";

import "./style/Course2.css";

import person1 from "../../../assets/AboutPage/person1.jfif";
import person2 from "../../../assets/AboutPage/person2.jfif";
import person3 from "../../../assets/AboutPage/person3.jfif";

const Course2 = () => {
  return (
    <div className="course2">
      <div className="course2__container">
        <div className="teach4__container-content">
          <ReviewCard
            image={person1}
            title={"Leadership, Communication"}
            name={"Deborah Grayson Riege"}
          />
          <ReviewCard
            image={person2}
            title={"Data Science & IT Certifications"}
            name={"Frank Kane"}
          />
          <ReviewCard
            image={person3}
            title={"Developer (Android Speciality)"}
            name={"Paulo Dichone"}
          />
        </div>
      </div>
    </div>
  );
};

export default Course2;
