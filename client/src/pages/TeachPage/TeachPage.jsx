import React, { useEffect, useState } from "react";

import Footer from "../../component/Footer/Footer";
import Navbar from "../../component/Navbar/Navbar";

import ShapeWave from "../../component/ShapeFiles/ShapeWave";
import ShapeWaveBottom from "../../component/ShapeFiles/ShapeWaveBottom";

import Teach1 from "./Teach/Teach1";
import Teach2 from "./Teach/Teach2";
import Teach3 from "./Teach/Teach3";
import Teach4 from "./Teach/Teach4";
import Loader from "../../component/Loader/Loader";

const TeachPage = () => {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2500);

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
          <Teach1 />
          <ShapeWave />
          <Teach2 />
          <ShapeWaveBottom />
          <Teach3 />
          <Teach4 />
          <ShapeWave />
          <Footer />
        </>
      )}
    </>
  );
};

export default TeachPage;
