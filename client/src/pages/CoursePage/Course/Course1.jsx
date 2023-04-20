import React from "react";
import "./style/Course1.css";

import banner from "../../../assets/CoursePage/Banner.avif";

const CourseData = [
  {
    id: 1,
    name: "Development",
    value: "development",
    icon: "fa-solid fa-code",
    url: "course/development",
  },
  {
    id: 2,
    name: "Business",
    value: "business",
    icon: "fa-solid fa-business-time",
    url: "course/business",
  },
  {
    id: 3,
    name: "IT and Software",
    value: "software",
    icon: "fa-sharp fa-solid fa-computer",
    url: "course/software",
  },
  {
    id: 4,
    name: "Design",
    value: "design",
    icon: "fa-solid fa-pen-nib",
    url: "course/design",
  },
  {
    id: 5,
    name: "Marketting",
    value: "marketting",
    icon: "fa-solid fa-shop",
    url: "course/marketting",
  },
  {
    id: 6,
    name: "Photography",
    value: "photography",
    icon: "fa-solid fa-camera-retro",
    url: "course/photography",
  },
  {
    id: 7,
    name: "Lifestyle",
    value: "lifestyle",
    icon: "fa-solid fa-hand-holding-heart",
    url: "course/lifestyle",
  },
  {
    id: 8,
    name: "Music",
    value: "music",
    icon: "fa-solid fa-music",
    url: "course/music",
  },
];

const Course1 = ({ setType }) => {
  const [active, setActive] = React.useState(null);

  return (
    <div className="course1">
      <img src={banner} alt="course-banner" />
      <div className="course1__container">
        <h1>categories</h1>
        <div className="course1__container-content">
          {CourseData.map((item) => {
            return (
              <div
                className={`course1__container-content-card ${
                  active === item.id && `course1__container-content-card-active`
                }`}
                key={item.id}
                onClick={() => {
                  setType(item.value);
                  setActive(item.id);
                }}
              >
                <div className="course1__container-content-card-icon">
                  <i className={item.icon}></i>
                </div>
                <div className="course1__container-content-card-name">
                  <p>{item.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Course1;
