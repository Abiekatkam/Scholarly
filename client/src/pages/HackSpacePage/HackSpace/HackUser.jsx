import React, { useEffect, useState } from "react";
import "./style/HackUser.css";

import Navbar from "../../../component/Navbar/Navbar";
import ShapeWave from "../../../component/ShapeFiles/ShapeWave";
import Footer from "../../../component/Footer/Footer";

import { useParams } from "react-router-dom";
import { PortUrl } from "../../../PORTURL";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { follow } from "../../../redux/userSlice";
import HackUser4 from "../../../component/Sections/HackUser4";
import HackUser2 from "../../../component/Sections/HackUser2";
import HackUser1 from "../../../component/Sections/HackUser1";
import Loader from "../../../component/Loader/Loader";

const HackUser = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const url = PortUrl;

  const [user, setUser] = useState(null);
  const [course, setCourse] = useState([]);
  const [post, setPost] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${url}/users/find/${params.id}`);
      setUser(res.data);
    };
    fetchUser();
  }, [params.id]);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(`${url}/course/user/${params.id}`);
      setCourse(res.data);
    };
    fetchCourse();
  }, [user]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`${url}/post/user/${params.id}`);
      setPost(res.data);
    };
    fetchPost();
  }, [params.id]);

  const handleFollow = async () => {
    try {
      if (currentUser.following.includes(user?._id)) {
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
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2400);

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
          <div className="hackuser">
            <div className="hackuser__container">
              <div className="hackuser__container-content">
                <img
                  src={user?.profileImg || "https://picsum.photos/200"}
                  alt="imagedata"
                />
                <div className="hackuser__container-content__data">
                  <div>
                    <h1>
                      {user?.firstname} {user?.lastname}
                    </h1>
                    <span>
                      {user?.isMentor === true ? "Instructor" : "Student"}
                    </span>
                    <p>{user?.bio ? user?.bio : "No bio available"}</p>
                  </div>

                  <div>
                    <div>
                      <span>Follower</span>
                      <p>{user?.follower?.length}</p>
                    </div>
                    <div>
                      <span>Following</span>
                      <p>{user?.following?.length}</p>
                    </div>
                  </div>
                </div>
                <button
                  className={
                    currentUser?.following.includes(user?._id)
                      ? "contentpage__button-unfollow"
                      : "contentpage__button-follow"
                  }
                  style={
                    currentUser?._id === user?._id ? { display: "none" } : null
                  }
                  onClick={handleFollow}
                >
                  {currentUser?.following.includes(user?._id)
                    ? "Unfollow"
                    : "Follow"}
                </button>
              </div>

              <div className="hackuser__container-tabs">
                <div className="userdashboard__container-data-tab-button">
                  <button
                    className={
                      activeTab === 0
                        ? "tab-button-active userdashboard__container-data-tab-button-data"
                        : "userdashboard__container-data-tab-button-data"
                    }
                    onClick={() => handleTabClick(0)}
                  >
                    Post ({post.length})
                  </button>
                  <button
                    className={
                      activeTab === 1
                        ? "tab-button-active userdashboard__container-data-tab-button-data"
                        : "userdashboard__container-data-tab-button-data"
                    }
                    onClick={() => handleTabClick(1)}
                  >
                    Follower
                  </button>
                  <button
                    className={
                      activeTab === 2
                        ? "tab-button-active userdashboard__container-data-tab-button-data"
                        : "userdashboard__container-data-tab-button-data"
                    }
                    onClick={() => handleTabClick(2)}
                  >
                    Following
                  </button>
                  {user?.isMentor === true && (
                    <button
                      className={
                        activeTab === 3
                          ? "tab-button-active userdashboard__container-data-tab-button-data"
                          : "userdashboard__container-data-tab-button-data"
                      }
                      onClick={() => handleTabClick(3)}
                    >
                      Courses ({course.length})
                    </button>
                  )}
                </div>

                <div className="hackuser__container-tabs-content">
                  {activeTab === 0 && <HackUser1 post={post} />}
                  {activeTab === 1 && <HackUser2 user={user?.follower} />}
                  {activeTab === 2 && <HackUser2 user={user?.following} />}
                  {activeTab === 3 && <HackUser4 course={course} />}
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

export default HackUser;
