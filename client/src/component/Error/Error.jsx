import React from "react";
import ErrorImage from "./ErrorImage";
import "./Error.css";
import { useSelector } from "react-redux";

const Error = ({ code, message }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="error">
      <div className="error__container">
        <div className="error__container-content">
          <ErrorImage />
        </div>
        <div className="error__container-data">
          <h1>{code || 404}</h1>
          <h2>{message || "UH OH! You're lost."}</h2>
          <p>
            The page you are looking for does not exist. How you got here is a
            mystery. But you can click the button below to go back to the{" "}
            {currentUser ? "CoursePage" : "HomePage"}
          </p>
          <a href={currentUser ? "/course" : "/"}>
            {currentUser ? "CoursePage" : "HomePage"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Error;
