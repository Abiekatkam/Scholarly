import React, { useEffect, useState } from "react";
import "./style/Course3.css";
import CourseCard from "../../../component/Cards/CourseCard";
import axios from "axios";
import { PortUrl } from "../../../PORTURL";

const Course3 = () => {
  const [course, setCourse] = useState([]);

  const url = PortUrl;

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(`${url}/course/random`);
      setCourse(res.data);
    };
    fetchCourse();
  }, []);

  return (
    <div className="course3">
      <div className="course3__container">
        <h1>Course Content</h1>
        <div className="course3__container-content">
          {course.map((course, index) => (
            <CourseCard course={course} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Course3;
