import React from "react";
import CourseCard from "../../../component/Cards/CourseCard";

const UserData4 = ({ course }) => {
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
      )}
    </>
  );
};

export default UserData4;
