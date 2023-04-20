import React from "react";
import "./ReviewCard.css";

export const ReviewCard = ({ image, name, title }) => {
  return (
    <div className="card">
      <div className="card__container">
        <div className="card__container-item">
          <i className="fa-solid fa-quote-left"></i>
          <i className="fa-solid fa-quote-right"></i>
        </div>
        <p className="card__container-para">
          Scholarly fit us like a glove. Their team curates fresh, up-to-date
          courses from their marketplace and makes them available to customers.
          the more deadlines you have and the more you procrastinate. As a young
          adult, you think you have forever to live and don’t appreciate the
          time you spend with others. As a middle-aged adult,
        </p>

        <div className="card__container-content">
          <img src={image} alt={name} />
          <div className="card__container-data">
            <h2>{name}</h2>
            <p>{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
