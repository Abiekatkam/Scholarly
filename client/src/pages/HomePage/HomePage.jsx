import React from "react";

import Footer from "../../component/Footer/Footer";
import Navbar from "../../component/Navbar/Navbar";
import ShapeWave from "../../component/ShapeFiles/ShapeWave";
import ShapeWaveBottom from "../../component/ShapeFiles/ShapeWaveBottom";
import Home1 from "./Home/Home1";
import Home2 from "./Home/Home2";
import Home3 from "./Home/Home3";
import Home4 from "./Home/Home4";
import Home5 from "./Home/Home5";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Home1 />
      <ShapeWave />
      <Home2 />
      <Home3 />
      <ShapeWaveBottom />
      <Home4 />
      <Home5 />
      <ShapeWave />
      <Footer />
    </>
  );
};

export default HomePage;
