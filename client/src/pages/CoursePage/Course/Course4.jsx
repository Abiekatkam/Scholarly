import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../../../component/Cards/CourseCard";
import { PortUrl } from "../../../PORTURL";

const Course4 = () => {
  const [trendCourse, setTrendCourse] = useState([]);

  const url = PortUrl;

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(`${url}/course/trend`);
      setTrendCourse(res.data);
    };
    fetchCourse();
  }, []);

  return (
    <div className="course3">
      <div className="course3__container">
        <h1>Trending</h1>
        <div className="course3__container-content">
          {trendCourse.slice(0, 3).map((course, index) => (
            <CourseCard course={course} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Course4;
