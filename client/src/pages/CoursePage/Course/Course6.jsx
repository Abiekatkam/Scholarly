import React from "react";
import CourseCard from "../../../component/Cards/CourseCard";

const Course6 = ({ course, type }) => {
  return (
    <div className="course3">
      <div className="course3__container">
        <h1>{type} Course</h1>
        <div className="course3__container-content">
          {course.length === 0 ? (
            <h3>
              Sorry for the inconvenience, No course available of this type
            </h3>
          ) : (
            course
              .slice(0, 6)
              .map((course, index) => (
                <CourseCard course={course} key={index} />
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Course6;
