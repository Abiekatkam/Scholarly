import axios from "axios";
import React, { useEffect, useState } from "react";
import { PortUrl } from "../../../PORTURL";
import RecommendCard from "../../../component/Cards/RecommendCard";

const HackSpace3 = () => {
  const [trendCourse, setTrendCourse] = useState([]);

  const url = PortUrl;

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(`${url}/course/random`);
      setTrendCourse(res.data);
    };
    fetchCourse();
  }, []);
  return (
    <div className="hackspace3__container">
      <h3>Trending Course</h3>
      <div>
        {trendCourse.slice(0, 6).map((course, index) => (
          <RecommendCard course={course} key={index} />
        ))}
      </div>
    </div>
  );
};

export default HackSpace3;
