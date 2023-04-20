import React from "react";
import CourseCard from "../Cards/CourseCard";

const HackUser4 = ({ course }) => {
  return (
    <>
      {course.length === 0 ? (
        <p>No course uploaded</p>
      ) : (
        <div>
          {course.map((course, index) => {
            return <CourseCard course={course} key={index} />;
          })}
        </div>
      )}{" "}
    </>
  );
};

export default HackUser4;
