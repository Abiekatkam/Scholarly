import React from "react";
import LinkButton from "../../../component/Buttons/LinkButton";
import "./style/Home4.css";
import { useSelector } from "react-redux";

const Home4 = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="home4">
      <div className="home4__container">
        <h2>Featured topics by category</h2>
        <div className="home4__container-content">
          <div className="home4__container-content--item">
            <h4>Development</h4>
            <div className="home4__container-content--item-links">
              <a href={currentUser ? "/course" : "/auth/user/register"}>
                Mobile Development
              </a>
              <a href={currentUser ? "/course" : "/auth/user/register"}>
                Web Development
              </a>
              <a href={currentUser ? "/course" : "/auth/user/register"}>
                Data science
              </a>
            </div>
          </div>
          <div className="home4__container-content--item">
            <h4>Business</h4>
            <div className="home4__container-content--item-links">
              <a href={currentUser ? "/course" : "/auth/user/register"}>
                Finance
              </a>
              <a href={currentUser ? "/course" : "/auth/user/register"}>
                Sales
              </a>
              <a href={currentUser ? "/course" : "/auth/user/register"}>
                Ecommerce
              </a>
            </div>
          </div>
          <div className="home4__container-content--item">
            <h4>IT and Software</h4>
            <div className="home4__container-content--item-links">
              <a href={currentUser ? "/course" : "/auth/user/register"}>
                Hardware
              </a>
              <a href={currentUser ? "/course" : "/auth/user/register"}>
                Ethical Hacking
              </a>
              <a href={currentUser ? "/course" : "/auth/user/register"}>
                Network and Security
              </a>
            </div>
          </div>
          <div className="home4__container-content--item">
            <h4>Design</h4>
            <div className="home4__container-content--item-links">
              <a href={currentUser ? "/course" : "/auth/user/register"}>
                3D anmation
              </a>
              <a href={currentUser ? "/course" : "/auth/user/register"}>
                UI / UX design
              </a>
              <a href={currentUser ? "/course" : "/auth/user/register"}>
                Graphic design
              </a>
            </div>
          </div>
        </div>

        <LinkButton
          text="Explore more"
          link={currentUser ? "/course" : "/auth/user/register"}
        />
      </div>
    </div>
  );
};

export default Home4;
