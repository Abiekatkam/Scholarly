import React from "react";
import "./HomeCards.css";
import { useSelector } from "react-redux";

const HomeCards = ({ url, name, src }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <a href={currentUser ? "/course" : url} className="homecard">
      <img src={src} alt={name} />
      <div className="homecard__content">
        <h4>{name}</h4>
      </div>
    </a>
  );
};

export default HomeCards;
