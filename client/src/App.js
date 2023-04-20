import React from "react";

import HomePage from "./pages/HomePage/HomePage";
import Error from "./component/Error/Error";
import { Navigate, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage/AboutPage";
import TeachPage from "./pages/TeachPage/TeachPage";
import UserLogin from "./component/Auth/UserLogin";
import UserRegister from "./component/Auth/UserRegister";
import CoursePage from "./pages/CoursePage/CoursePage";
import { useSelector } from "react-redux";
import ContentPage from "./pages/ContentPage/ContentPage";
import CourseVideo from "./pages/CourseVideo/CourseVideo";
import Favourites from "./component/Sections/Favourites";
import UserDashboard from "./pages/DashboardPage/UserDashboard";
import MentorLogin from "./component/Auth/MentorLogin";
import MentorRegister from "./component/Auth/MentorRegister";
import HackSpacePage from "./pages/HackSpacePage/HackSpacePage";
import HackPost from "./pages/HackSpacePage/HackSpace/HackPost";
import MyCourse from "./component/Sections/MyCourse";
import HackUser from "./pages/HackSpacePage/HackSpace/HackUser";

const App = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route index path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />

      {currentUser ? (
        <Route path="/teach" element={<Error />} />
      ) : (
        <Route path="/teach" element={<TeachPage />} />
      )}

      {currentUser && <Route path="/course" element={<CoursePage />} />}
      {currentUser && (
        <Route path="/course/:courseId" element={<ContentPage />} />
      )}
      {currentUser && (
        <Route path="/course/video/:courseId" element={<CourseVideo />} />
      )}

      {currentUser && <Route path="/hackspace" element={<HackSpacePage />} />}
      {currentUser && (
        <Route path="/hackspace/post/:id" element={<HackPost />} />
      )}
      {currentUser && (
        <Route path="/hackspace/user/:id" element={<HackUser />} />
      )}

      <Route path="/user/wishlist" element={<Favourites />} />
      <Route path="/dashboard" element={<UserDashboard />} />

      <Route path="/mentor/mycourse" element={<MyCourse />} />

      <Route path="/auth/user/login" element={<UserLogin />} />
      <Route path="/auth/mentor/login" element={<MentorLogin />} />
      <Route path="/auth/user/register" element={<UserRegister />} />
      <Route path="/auth/mentor/register" element={<MentorRegister />} />

      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
