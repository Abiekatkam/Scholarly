import React, { useEffect, useState } from "react";

import CourseCard from "../../../component/Cards/CourseCard";
import axios from "axios";
import LinkButton from "../../../component/Buttons/LinkButton";
import { PortUrl } from "../../../PORTURL";
import { useSelector } from "react-redux";

const Course5 = () => {
  const [course, setCourse] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const url = PortUrl;

  useEffect(() => {
    let isMounted = true;
    const fetchCourse = async () => {
      const uniqueCourseIds = [...new Set(currentUser.wishlist)];
      const courses = await Promise.all(
        uniqueCourseIds.map(async (courseId) => {
          const res = await axios.get(`${url}/course/find/${courseId}`);
          return res.data;
        })
      );
      if (isMounted) {
        setCourse((prevCourses) => [...prevCourses, ...courses]);
      }
    };
    fetchCourse();

    return () => {
      isMounted = false;
      setCourse([]);
    };
  }, [currentUser.wishlist]);

  return (
    <div
      className="course3"
      style={course.length === 0 ? { display: "none" } : { display: "" }}
    >
      <div className="course3__container">
        <h1>
          Continue learning, {currentUser.firstname} {currentUser.lastname}
        </h1>
        <div className="course3__container-content">
          {course.slice(0, 3).map((course, index) => (
            <CourseCard course={course} key={index} />
          ))}
        </div>
        {course.length > 3 && (
          <LinkButton text={"View all"} link={"/user/wishlist"} />
        )}
      </div>
    </div>
  );
};

export default Course5;
