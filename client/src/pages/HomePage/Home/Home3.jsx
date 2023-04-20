import React from "react";
import HomeCards from "../../../component/Cards/HomeCards";

import "./style/Home3.css";

import business from "../../../assets/HomePage/business.svg";
import design from "../../../assets/HomePage/design.svg";
import marketting from "../../../assets/HomePage/marketting.svg";
import development from "../../../assets/HomePage/development.svg";
import music from "../../../assets/HomePage/music.svg";
import personal from "../../../assets/HomePage/personal.svg";
import photo from "../../../assets/HomePage/photo.svg";
import software from "../../../assets/HomePage/software.svg";

const Data = [
  {
    id: 1,
    src: business,
    name: "business",
    url: "/auth/user/register",
  },
  {
    id: 2,
    src: design,
    name: "design",
    url: "/auth/user/register",
  },
  {
    id: 3,
    src: marketting,
    name: "marketting",
    url: "/auth/user/register",
  },
  {
    id: 4,
    src: development,
    name: "development",
    url: "/auth/user/register",
  },
  {
    id: 5,
    src: music,
    name: "music",
    url: "/auth/user/register",
  },
  {
    id: 6,
    src: personal,
    name: "lifestyle",
    url: "/auth/user/register",
  },
  {
    id: 7,
    src: photo,
    name: "photography",
    url: "/auth/user/register",
  },
  {
    id: 8,
    src: software,
    name: "it and software",
    url: "/auth/user/register",
  },
];

const Home3 = () => {
  return (
    <div className="home3">
      <div className="home3__container">
        <h3>Top Categories</h3>

        <div className="home3__container-content">
          {Data.map((item) => (
            <HomeCards
              src={item.src}
              url={item.url}
              name={item.name}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home3;
