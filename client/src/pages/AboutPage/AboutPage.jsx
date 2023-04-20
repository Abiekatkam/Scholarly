import React, { useEffect, useState } from "react";

import Footer from "../../component/Footer/Footer";
import Navbar from "../../component/Navbar/Navbar";

import ShapeWave from "../../component/ShapeFiles/ShapeWave";
import ShapeWaveBottom from "../../component/ShapeFiles/ShapeWaveBottom";
import About1 from "./About/About1";
import About2 from "./About/About2";
import About3 from "./About/About3";
import About4 from "./About/About4";

import Loader from "../../component/Loader/Loader";

const AboutPage = () => {
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
          <About1 />
          <ShapeWave />
          <About2 />
          <About3 />
          <ShapeWaveBottom />
          <About4 />
          <ShapeWave />
          <Footer />
        </>
      )}
    </>
  );
};

export default AboutPage;
