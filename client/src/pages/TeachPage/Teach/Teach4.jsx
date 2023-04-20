import React from "react";
import "./style/Teach4.css";

import { ReviewCard } from "../../../component/Cards/ReviewCard";

import you1 from "../../../assets/TeachPage/you1.jfif";
import you2 from "../../../assets/TeachPage/you2.jfif";
import you3 from "../../../assets/TeachPage/you3.jfif";
import LinkButton from "../../../component/Buttons/LinkButton";

const Teach4 = () => {
  return (
    <div className="teach4">
      <div className="teach4__container">
        <h1>Instructors Reviews</h1>
        <div className="teach4__container-content">
          <ReviewCard
            image={you1}
            title={"Leadership, Communication"}
            name={"Deborah Grayson Riege"}
          />
          <ReviewCard
            image={you2}
            title={"Data Science & IT Certifications"}
            name={"Frank Kane"}
          />
          <ReviewCard
            image={you3}
            title={"Developer (Android Speciality)"}
            name={"Paulo Dichone"}
          />
        </div>
        <div className="teach4__container-content">
          <ReviewCard
            image={you3}
            title={"Leadership, Communication"}
            name={"Deborah Grayson Riege"}
          />
          <ReviewCard
            image={you1}
            title={"Data Science & IT Certifications"}
            name={"Frank Kane"}
          />
          <ReviewCard
            image={you2}
            title={"Developer (Android Speciality)"}
            name={"Paulo Dichone"}
          />
        </div>

        <div className="teach4__container-content--data">
          <h1>Become An Instructor Today</h1>
          <p>
            Join our community to upgrade yourself and express your talents.
            Since they are still preserved in the rocks for us to see, they must
            have been formed quite recently, that is, geologically speaking.
            What can explain these striations and their
          </p>
          <LinkButton text={"Enroll Now"} link={"/auth/mentor/register"} />
        </div>
      </div>
    </div>
  );
};

export default Teach4;
