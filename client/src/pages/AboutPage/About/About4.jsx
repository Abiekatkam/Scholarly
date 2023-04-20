import React from "react";
import "./style/About4.css";

import img1 from "../../../assets/AboutPage/img1.svg";
import img2 from "../../../assets/AboutPage/img2.svg";
import img3 from "../../../assets/AboutPage/img3.svg";

const About4 = () => {
  return (
    <div className="about4">
      <div className="about4__container">
        <div className="about4__container-content">
          <div className="about4__container-content-data">
            <h1>STUDENTS PERSONAL DATABASE</h1>
            <p>
              Since they are still preserved in the rocks for us to see, they
              must have been formed quite recently, that is, geologically
              speaking. What can explain these striations and their common
              orientation? Did you ever hear about the Great Ice Age or the
              Pleistocene Epoch? Less than one million years ago, in fact, some
              12,000 years ago, an ice sheet many thousands of feet thick rode
              over Burke Mountain in a southeastward direction. The many
              boulders frozen to the underside of the ice sheet tended to
            </p>
          </div>
          <div className="about4__container-content-image">
            <img src={img1} alt="img1" />
          </div>
        </div>
        <div className="about4__container-content">
          <div className="about4__container-content-data">
            <h1>JOB PORTALS AND PLACEMENTS</h1>
            <p>
              Since they are still preserved in the rocks for us to see, they
              must have been formed quite recently, that is, geologically
              speaking. What can explain these striations and their common
              orientation? Did you ever hear about the Great Ice Age or the
              Pleistocene Epoch? Less than one million years ago, in fact, some
              12,000 years ago, an ice sheet many thousands of feet thick rode
              over Burke Mountain in a southeastward direction. The many
              boulders frozen to the underside of the ice sheet tended to
            </p>
          </div>
          <div className="about4__container-content-image">
            <img src={img2} alt="img1" />
          </div>
        </div>
        <div className="about4__container-content">
          <div className="about4__container-content-data">
            <h1>LARGE COLLECTION OF EXPERTS MENTORS</h1>
            <p>
              Since they are still preserved in the rocks for us to see, they
              must have been formed quite recently, that is, geologically
              speaking. What can explain these striations and their common
              orientation? Did you ever hear about the Great Ice Age or the
              Pleistocene Epoch? Less than one million years ago, in fact, some
              12,000 years ago, an ice sheet many thousands of feet thick rode
              over Burke Mountain in a southeastward direction. The many
              boulders frozen to the underside of the ice sheet tended to
            </p>
          </div>
          <div className="about4__container-content-image">
            <img src={img3} alt="img1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About4;
