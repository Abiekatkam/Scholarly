import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import ShapeWave from "../../component/ShapeFiles/ShapeWave";
import Footer from "../../component/Footer/Footer";

import "./HackSpace/style/HackSpace.css";
import HackSpace1 from "./HackSpace/HackSpace1";
import HackSpace2 from "./HackSpace/HackSpace2";
import HackSpace3 from "./HackSpace/HackSpace3";
import Loader from "../../component/Loader/Loader";

const HackSpacePage = () => {
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
          <div className="hackspace">
            <HackSpace1 />
            <HackSpace2 />
            <HackSpace3 />
          </div>
          <ShapeWave />
          <Footer />
        </>
      )}
    </>
  );
};

export default HackSpacePage;
