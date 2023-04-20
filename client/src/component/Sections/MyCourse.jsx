import React, { useEffect, useState } from "react";
import "./Favourites.css";

import Navbar from "../Navbar/Navbar";
import ShapeWave from "../ShapeFiles/ShapeWave";
import Footer from "../Footer/Footer";

import { useSelector } from "react-redux";
import { PortUrl } from "../../PORTURL";
import axios from "axios";

import empty from "../../assets/emptycart.svg";
import CourseCard from "../Cards/CourseCard";
import Loader from "../Loader/Loader";

const MyCourse = () => {
  const [course, setCourse] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const url = PortUrl;

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(`${url}/course/user/${currentUser._id}`);
      setCourse(res.data);
    };
    fetchCourse();
  }, [currentUser._id]);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2200);

    return () => {
      setLoader(true);
    };
  }, []);

  return (
    <>
      {loader === true ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="favourites">
            <div className="favourites__container">
              {course.length === 0 ? (
                <div className="favourites__container-content">
                  <img src={empty} alt="empty cart" />
                  <p>
                    Your have not upload any course, explore course section and
                    upgrade your skills. Click here for the exploring{" "}
                    <a href="/course">Course Page</a>
                  </p>
                </div>
              ) : (
                <div className="favourites__container-data">
                  <h1>My courses</h1>
                  <div className="course3__container-content">
                    {course.map((course, index) => (
                      <CourseCard course={course} key={index} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <ShapeWave />
          <Footer />
        </>
      )}
    </>
  );
};

export default MyCourse;
