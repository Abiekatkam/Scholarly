import React, { useEffect, useState } from "react";
import "./Recommend.css";

import axios from "axios";
import { PortUrl } from "../../PORTURL";
import RecommendCard from "../Cards/RecommendCard";

const Recommend = () => {
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
    <div className="recommend">
      {course.slice(0, 6).map((course) => (
        <RecommendCard course={course} key={course._id} />
      ))}
    </div>
  );
};

export default Recommend;
