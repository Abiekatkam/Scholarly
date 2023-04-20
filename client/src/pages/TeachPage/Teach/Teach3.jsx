import React from "react";
import "./style/Teach3.css";

import img1 from "../../../assets/TeachPage/recording.svg";
import img2 from "../../../assets/TeachPage/plan1.svg";
import img3 from "../../../assets/TeachPage/launchingcourse.svg";

const Teach3 = () => {
  return (
    <div className="teach3">
      <div className="teach3__container">
        <div className="teach3__container-content">
          <div className="teach3__container-content-data">
            <h1>Plan your curriculum</h1>
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
          <div className="teach3__container-content-image">
            <img src={img1} alt="img1" />
          </div>
        </div>
        <div className="teach3__container-content">
          <div className="teach3__container-content-data">
            <h1>record your video</h1>
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
          <div className="teach3__container-content-image">
            <img src={img2} alt="img1" />
          </div>
        </div>
        <div className="teach3__container-content">
          <div className="teach3__container-content-data">
            <h1>launch your courses</h1>
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
          <div className="teach3__container-content-image">
            <img src={img3} alt="img1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teach3;
