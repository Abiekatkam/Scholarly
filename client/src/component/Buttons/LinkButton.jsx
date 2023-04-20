import React from "react";
import "./LinkButton.css";

const LinkButton = ({ text, link }) => {
  return (
    <a href={link} className="link__button">
      {text}
    </a>
  );
};

export default LinkButton;
