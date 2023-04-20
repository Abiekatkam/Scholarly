import React, { useEffect, useState } from "react";
import "./style/UserDashboard.css";
import Navbar from "../../component/Navbar/Navbar";
import ShapeWave from "../../component/ShapeFiles/ShapeWave";
import Footer from "../../component/Footer/Footer";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

import axios from "axios";
import { PortUrl } from "../../PORTURL";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../../redux/userSlice";
import UserData1 from "./data/UserData1";
import UserData2 from "./data/UserData2";
import UserData4 from "./data/UserData4";
import Loader from "../../component/Loader/Loader";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

const UserDashboard = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  const [course, setCourse] = useState([]);
  const [myCourse, setMyCourse] = useState([]);
  const [post, setPost] = useState([]);

  const { currentUser } = useSelector((state) => state.user);

  const url = PortUrl;

  const [image, setImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [formData, setFormData] = React.useState({
    firstname: "",
    lastname: "",
    bio: "",
    userId: "",
    profileImg: "",
  });

  const imageRef = React.useRef(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      userId: currentUser?._id,
      profileImg: imageUrl,
    });
  };

  const uploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    image && uploadFile(image);
  }, [image]);

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

  useEffect(() => {
    const fetchCourseByUserId = async () => {
      const res = await axios.get(`${url}/course/user/${currentUser?._id}`);
      setMyCourse(res.data);
    };
    fetchCourseByUserId();
  }, [currentUser]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`${url}/post/user/${currentUser?._id}`);
      setPost(res.data);
    };
    fetchPost();
  }, [currentUser?._id]);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const handleLogout = () => {
    window.location.href = "/";
    dispatch(logout());
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

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`${url}/users/${currentUser?._id}`, formData);
      dispatch(loginSuccess(res.data.cred));

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setImage(null);
  };

  return (
    <>
      {loader === true ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="userdashboard">
            <div className="userdashboard__container">
              <div className="userdashboard__container-content">
                <img
                  src={currentUser.profileImg || "https://picsum.photos/200"}
                  alt="imagedata"
                />
                <div className="userdashboard__container-content__data">
                  <div className="userdashboard__container-content__data-content1">
                    <h1>
                      Hi, {currentUser.firstname} {currentUser.lastname}
                    </h1>
                    <span>
                      Account type:{" "}
                      {currentUser.isMentor === true ? "Instructor" : "Student"}
                    </span>
                    <p>
                      {currentUser.bio
                        ? currentUser.bio
                        : "Write something about yourself..."}
                    </p>
                  </div>
                  <div className="userdashboard__container-content__data-content2">
                    <button onClick={handleShowModal}>Edit Profile</button>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </div>
              </div>

              <Modal
                opened={showModal}
                onClose={handleCloseModal}
                title="Edit profile"
                size="lg"
              >
                <form className="userdashboard-form" onSubmit={handleUpload}>
                  <div className="userdashboard-form-image">
                    <img
                      src={
                        image
                          ? imageUrl
                          : currentUser.profileImg ||
                            "https://picsum.photos/200"
                      }
                      alt="imagedata"
                    />
                    <div>
                      <label htmlFor="profileImg">Change Image</label>
                      <button
                        onClick={() => {
                          imageRef.current.click();
                        }}
                      >
                        Upload here
                      </button>
                      <div style={{ display: "none" }}>
                        <input
                          type="file"
                          name="myImage"
                          ref={imageRef}
                          onChange={onImageChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="userdashboard-form-data">
                    <div>
                      <label htmlFor="firstname">Firstname</label>
                      <input
                        type="text"
                        name="firstname"
                        placeholder="Firstname"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastname">Lastname</label>
                      <input
                        type="text"
                        name="lastname"
                        placeholder="Lastname"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="userdashboard-form-textarea">
                    <label htmlFor="profileImg">Your description</label>
                    <textarea
                      name="bio"
                      rows="3"
                      cols="8"
                      placeholder="Write something about yourself..."
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button type="submit">Update Profile</button>
                </form>
              </Modal>

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
                  {currentUser?.isMentor === true ? (
                    <button
                      className={
                        activeTab === 3
                          ? "tab-button-active userdashboard__container-data-tab-button-data"
                          : "userdashboard__container-data-tab-button-data"
                      }
                      onClick={() => handleTabClick(3)}
                    >
                      Courses ({myCourse.length})
                    </button>
                  ) : (
                    <button
                      className={
                        activeTab === 4
                          ? "tab-button-active userdashboard__container-data-tab-button-data"
                          : "userdashboard__container-data-tab-button-data"
                      }
                      onClick={() => handleTabClick(4)}
                    >
                      Wishlist ({course.length})
                    </button>
                  )}
                </div>

                <div className="hackuser__container-tabs-content">
                  {activeTab === 0 && <UserData1 post={post} />}
                  {activeTab === 1 && (
                    <UserData2 user={currentUser?.follower} />
                  )}
                  {activeTab === 2 && (
                    <UserData2 user={currentUser?.following} />
                  )}
                  {activeTab === 3 && <UserData4 course={myCourse} />}
                  {activeTab === 4 && <UserData4 course={course} />}
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

export default UserDashboard;
