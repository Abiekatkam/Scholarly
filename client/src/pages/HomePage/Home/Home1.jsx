import React from "react";
import Hero from "../../../assets/HomePage/homepage.webp";
import LinkButton from "../../../component/Buttons/LinkButton";

import "./style/Home1.css";
import { useSelector } from "react-redux";

const Home1 = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <main className="home1">
      <div className="home1__container">
        <div className="home1__container-content">
          <h1>Scholarly,</h1>
          <p>
            Online learning platform where you can achieve your goal and make a
            better you.
          </p>
          <LinkButton
            text="Get started"
            link={currentUser ? "/course" : "/auth/user/register"}
          />
        </div>
        <div className="home1__container-image">
          <img src={Hero} alt="HomePageImage" />
        </div>
      </div>
    </main>
  );
};

export default Home1;
