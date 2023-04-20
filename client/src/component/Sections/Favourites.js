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

const Favourites = () => {
  const [course, setCourse] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const url = PortUrl;

  useEffect(() => {
    let isMounted = true;
    const fetchCourse = async () => {
      const uniqueCourseIds = [...new Set(currentUser.wishlist)];
      const courses = await Promise.all(
        uniqueCourseIds.map(async (courseId) => {
          const res = await axios.get(`${url}/course/find/${courseId}`);
          return res.data;
        })
      );
      if (isMounted) {
        setCourse((prevCourses) => [...prevCourses, ...courses]);
      }
    };
    fetchCourse();

    return () => {
      isMounted = false;
      setCourse([]);
    };
  }, [currentUser.wishlist]);

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
                    Your wishlist is empty, explore course section and upgrade
                    your skills. Click here for the exploring{" "}
                    <a href="/course">Course Page</a>
                  </p>
                </div>
              ) : (
                <div className="favourites__container-data">
                  <h1>My Wishlist</h1>
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

export default Favourites;
