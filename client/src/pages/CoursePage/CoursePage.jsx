import React, { useEffect, useState } from "react";

import Footer from "../../component/Footer/Footer";
import Navbar from "../../component/Navbar/Navbar";

import ShapeWave from "../../component/ShapeFiles/ShapeWave";
import Course1 from "./Course/Course1";
import Course2 from "./Course/Course2";
import Course3 from "./Course/Course3";
import Course4 from "./Course/Course4";
import Course5 from "./Course/Course5";

import { PortUrl } from "../../PORTURL";
import axios from "axios";
import Course6 from "./Course/Course6";
import Loader from "../../component/Loader/Loader";

const CoursePage = () => {
  const url = PortUrl;
  const [type, setType] = useState("");
  const [course, setCourse] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.post(`${url}/course/type`, {
        type: type,
      });
      setCourse(res.data);
    };
    fetchCourse();
  }, [type]);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2800);

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
          <Course1 setType={setType} />
          <div style={type === "" ? { display: "none" } : { display: "" }}>
            <Course6 course={course} type={type} />
          </div>
          <Course5 />
          <Course4 />
          <Course3 />
          <Course2 />
          <ShapeWave />
          <Footer />
        </>
      )}
    </>
  );
};

export default CoursePage;
