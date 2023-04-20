import React, { useEffect } from "react";
import "./CourseVideo.css";
import Navbar from "../../component/Navbar/Navbar";
import ShapeWave from "../../component/ShapeFiles/ShapeWave";
import Footer from "../../component/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import axios from "axios";
import { format } from "timeago.js";
import { PortUrl } from "../../PORTURL";
import { follow, wishlist } from "../../redux/userSlice";
import Comment from "../../component/Comment/Comment";
import Recommend from "../../component/Recommend/Recommend";

const CourseVideo = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentCourse } = useSelector((state) => state.course);

  const params = useParams();
  const dispatch = useDispatch();
  const url = PortUrl;

  const [user, setUser] = React.useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const user = await axios.get(
          `${url}/users/find/${currentCourse.userId}`
        );
        setUser(user.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideo();
  }, [params.courseId]);

  const handleWishlist = async () => {
    if (currentUser.wishlist.includes(currentCourse._id)) {
      await axios.post(`${url}/users/wishlist`, {
        courseId: currentCourse._id,
        userId: currentUser._id,
      });
      dispatch(wishlist(currentCourse._id));
    } else {
      await axios.post(`${url}/users/wishlist`, {
        courseId: currentCourse._id,
        userId: currentUser._id,
      });
      dispatch(wishlist(currentCourse._id));
    }
  };

  const handleFollow = async () => {
    try {
      if (currentUser.wishlist.includes(currentCourse._id)) {
        await axios.post(`${url}/users/follow`, {
          userId: currentUser._id,
          anonymousId: user._id,
        });
        dispatch(follow(user._id));
      } else {
        await axios.post(`${url}/users/follow`, {
          userId: currentUser._id,
          anonymousId: user._id,
        });
        dispatch(follow(user._id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="coursevideo">
        <div className="coursevideo__container">
          <div className="coursevideo__container-content">
            <video src={currentCourse?.videoUrl} controls></video>
            <h1>{currentCourse?.title}</h1>
            <div className="coursevideo__container-content-desc">
              <p>
                {format(currentCourse?.createdAt) || "shdjs"} •{" "}
                <span style={{ textTransform: "capitalize" }}>
                  {currentCourse?.videoType || "shdjs"}
                </span>
              </p>
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
            <div className="coursevideo__container-content-data">
              <div>
                <img
                  src={user?.profileImg || "https://picsum.photos/200"}
                  alt="pizza"
                />
                <div>
                  <a href={`/hackspace/user/${user?._id}`}>
                    {user.firstname} {user.lastname}
                  </a>
                  <p>{currentCourse?.desc}</p>
                </div>
              </div>
              <button
                className={
                  currentUser?.following.includes(user._id)
                    ? "contentpage__button-unfollow"
                    : "contentpage__button-follow"
                }
                style={
                  currentUser._id === user._id ? { display: "none" } : null
                }
                onClick={handleFollow}
              >
                {currentUser.following.includes(user._id)
                  ? "Unfollow"
                  : "Follow"}
              </button>
            </div>

            <Comment videoId={currentCourse._id} />
          </div>
          <div className="coursevideo__container-recommendation">
            <Recommend />
          </div>
        </div>
      </div>
      <ShapeWave />
      <Footer />
    </>
  );
};

export default CourseVideo;
