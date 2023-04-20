import React, { useEffect, useState } from "react";
import "./CourseCard.css";
import axios from "axios";
import { format } from "timeago.js";
import courseImg from "../../assets/courseImg.png";
import { PortUrl } from "../../PORTURL";

const CourseCard = ({ course }) => {
  const [mentor, setMentor] = useState({});

  const url = PortUrl;

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`${url}/users/find/${course?.userId}`);
      setMentor(res.data);
    };
    fetchChannel();
  }, [course.userId]);

  return (
    <a
      href={`/course/${course._id}`}
      style={{ textDecoration: "none" }}
      className="coursecard"
    >
      <div className="coursecard__container">
        <img
          src={course.imgUrl || courseImg}
          className="coursecard__img"
          alt={course.imgUrl}
        />
        <div className="coursecard__content">
          <img
            src={mentor.profileImg || "https://picsum.photos/200"}
            alt="img"
            className="coursecard__content-img"
          />
          <div className="coursecard__content-data">
            <h1>{course.title}</h1>
            <h2>
              {mentor.firstname} {mentor.lastname}
            </h2>
            <div className="coursecard__content-data-item">
              {format(course.createdAt)} •{" "}
              <span style={{ textTransform: "capitalize" }}>
                {course.videoType}
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default CourseCard;
