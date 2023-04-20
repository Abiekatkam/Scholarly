import React from "react";
import "./RecommendCard.css";

const RecommendCard = ({ course }) => {
  return (
    <a href={`/course/${course?._id}`} className="recommendcard">
      <div className="recommendcard_image">
        <img src={course?.imgUrl} alt="alternate" />
      </div>
      <div className="recommendcard_info">
        <h3>{course?.title}</h3>
        <p>{course?.desc.slice(0, 60)}</p>
      </div>
    </a>
  );
};

export default RecommendCard;
