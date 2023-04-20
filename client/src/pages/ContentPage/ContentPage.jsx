import React, { useEffect, useState } from "react";

import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import ShapeWave from "../../component/ShapeFiles/ShapeWave";
import { PortUrl } from "../../PORTURL";

import { useParams } from "react-router-dom";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { fetchSuccess } from "../../redux/courseSlice";
import { follow, wishlist } from "../../redux/userSlice";

import "./ContentPage.css";
import Loader from "../../component/Loader/Loader";

const ContentPage = () => {
  const params = useParams();
  const [userData, setUserData] = React.useState([]);

  const { currentUser } = useSelector((state) => state.user);
  const { currentCourse } = useSelector((state) => state.course);

  const url = PortUrl;
  const id = params.courseId;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContent = async () => {
      const res = await axios.get(`${url}/course/find/${id}`);
      const user = await axios.get(`${url}/users/find/${res.data.userId}`);
      setUserData(user.data);
      dispatch(fetchSuccess(res.data));
    };

    fetchContent();
  }, [id]);

  const handleWishlist = async () => {
    try {
      if (currentUser.wishlist.includes(currentCourse?._id)) {
        await axios.post(`${url}/users/wishlist`, {
          courseId: currentCourse?._id,
          userId: currentUser?._id,
        });
        dispatch(wishlist(currentCourse?._id));
      } else {
        await axios.post(`${url}/users/wishlist`, {
          courseId: currentCourse?._id,
          userId: currentUser?._id,
        });
        dispatch(wishlist(currentCourse?._id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async () => {
    try {
      if (currentUser.following.includes(userData?._id)) {
        await axios.post(`${url}/users/follow`, {
          userId: currentUser._id,
          anonymousId: userData._id,
        });
        dispatch(follow(userData._id));
      } else {
        await axios.post(`${url}/users/follow`, {
          userId: currentUser._id,
          anonymousId: userData._id,
        });
        dispatch(follow(userData._id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1900);

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
          <div className="contentpage">
            <div className="contentpage__container">
              <div className="contentpage__container-banner">
                <h1>{currentCourse?.videoType} course</h1>
              </div>
              <div className="contentpage__container-content">
                <div className="contentpage__container-content-data">
                  <div className="contentpage__container-content-data-course">
                    <h2>{currentCourse?.title}</h2>
                    <p>{currentCourse?.desc}</p>

                    <span>
                      {format(currentCourse?.createdAt)} •{" "}
                      <span style={{ textTransform: "capitalize" }}>
                        {currentCourse?.videoType}
                      </span>
                    </span>
                  </div>
                  <div className="contentpage__container-content-data-user">
                    <div>
                      <img
                        src={
                          userData?.profileImg || "https://picsum.photos/200"
                        }
                        alt={userData?.firstname}
                      />
                      <a href={`/hackspace/user/${userData?._id}`}>
                        {userData.firstname} {userData.lastname}
                      </a>
                    </div>
                    <button
                      className={
                        currentUser?.following.includes(userData?._id)
                          ? "contentpage__button-unfollow"
                          : "contentpage__button-follow"
                      }
                      style={
                        currentUser._id === userData._id
                          ? { display: "none" }
                          : null
                      }
                      onClick={handleFollow}
                    >
                      {currentUser.following.includes(userData?._id)
                        ? "Unfollow"
                        : "Follow"}
                    </button>
                  </div>
                </div>
                <div className="contentpage__container-content-image">
                  <img src={currentCourse?.imgUrl} alt={currentCourse?.title} />
                  <div>
                    <a
                      href={`/course/video/${id}`}
                      className="contentpage__container-content-button"
                    >
                      Start learning
                    </a>
                    <button
                      className="contentpage__container-content-button-icons"
                      onClick={handleWishlist}
                      style={currentUser.isMentor ? { display: "none" } : null}
                    >
                      {currentUser?.wishlist.includes(currentCourse?._id) ? (
                        <>
                          <i className="fa-solid fa-bookmark"></i>
                          <p>Added to wishlist</p>
                        </>
                      ) : (
                        <>
                          <i className="fa-regular fa-bookmark"></i>
                          <p>Add to wishlist</p>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ShapeWave />
          <Footer />
        </>
      )}
    </>
  );
};

export default ContentPage;
