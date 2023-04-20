import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";

import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import axios from "axios";
import { PortUrl } from "../../PORTURL";
import CubicleBot from "../Sections/CubicleBot";

function Navbar() {
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  function handleModal1Close() {
    setModalVisible1(false);
  }

  function handleModal2Close() {
    setModalVisible2(false);
  }

  const url = PortUrl;

  const [image, setImage] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [videoPercent, setVideoPercent] = useState(0);

  const [inputs, setInputs] = useState({});

  const { currentUser } = useSelector((state) => state.user);

  const handleUpload = async (e) => {
    e.preventDefault();
    await axios.post(`${url}/course/`, { ...inputs, userId: currentUser?._id });
    setInputs({});
    window.location.reload();
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImagePercent(Math.round(progress))
          : setVideoPercent(Math.round(progress));
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
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    image && uploadFile(image, "imgUrl");
  }, [image]);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {!currentUser ? (
          <a className="navbar__container-brand" href="/">
            Scholarly
          </a>
        ) : (
          <div className="navbar__container-data">
            <a className="navbar__container-brand" href="/course">
              Scholarly
            </a>
            <div />
            {currentUser.isMentor === true ? (
              <span>Instructor</span>
            ) : (
              <span>Student</span>
            )}
          </div>
        )}
        <div className="navbar__container-content">
          {!currentUser ? (
            <ul className="navbar__container-content__data">
              <li className="navbar__container-content__data-item">
                <a
                  className="navbar__container-content__data-link"
                  aria-current="page"
                  href="/about"
                >
                  About
                </a>
              </li>
              <li className="navbar__container-content__data-item">
                <a
                  className="navbar__container-content__data-link"
                  aria-current="page"
                  href={currentUser ? "/course" : "/auth/user/register"}
                >
                  Course
                </a>
              </li>
              <li className="navbar__container-content__data-item">
                <a
                  className="navbar__container-content__data-link"
                  href="/teach"
                >
                  TeachOn
                </a>
              </li>
              <li className="navbar__container-content__data-item">
                <a
                  className="navbar__container-content__data-links"
                  href="/auth/user/login"
                >
                  Login
                </a>
              </li>
              <li className="navbar__container-content__data-item">
                <a
                  className="navbar__container-content__data-links"
                  href="/auth/user/register"
                >
                  Register
                </a>
              </li>
            </ul>
          ) : (
            <ul className="navbar__container-content__data">
              {currentUser.isMentor === true ? (
                <>
                  <li className="navbar__container-content__data-item">
                    <a
                      className="navbar__container-content__data-link"
                      // className="navbar__container-content__data-link-changes"
                      aria-current="page"
                      href="/mentor/mycourse"
                    >
                      My Course
                    </a>
                  </li>
                  <li className="navbar__container-content__data-item">
                    <button
                      className="navbar__container-content__data-link"
                      // className="navbar__container-content__data-link-changes"
                      onClick={() => setModalVisible1(true)}
                    >
                      Upload
                    </button>
                  </li>
                  <Modal
                    opened={modalVisible1}
                    onClose={handleModal1Close}
                    title="Upload Course"
                    size="lg"
                  >
                    <form className="modal__form" onSubmit={handleUpload}>
                      <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                          type="text"
                          name="title"
                          placeholder="Enter title"
                          required
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                          name="desc"
                          required
                          placeholder="Enter description"
                          rows={8}
                          cols={50}
                          noresize
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="videoType">Video type</label>
                        <select
                          name="videoType"
                          placeholder="Select type of course"
                          onChange={handleChange}
                          required
                        >
                          <option
                            defaultValue="development"
                            value="development"
                          >
                            Development
                          </option>
                          <option value="software">Software</option>
                          <option value="music">Music</option>
                          <option value="design">Design</option>
                          <option value="marketing">Marketing</option>
                          <option value="business">Business</option>
                          <option value="photography">Photography</option>
                          <option value="lifestyle">Lifestyle</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="videoUrl">Video URL</label>
                        {videoPercent > 0 ? (
                          "Uploading " + videoPercent + "%"
                        ) : (
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => setVideo(e.target.files[0])}
                            required
                          />
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="imgUrl">Image</label>
                        {imagePercent > 0 ? (
                          "Uploading " + imagePercent + "%"
                        ) : (
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                          />
                        )}
                      </div>
                      <button type="submit">Upload</button>
                    </form>
                  </Modal>
                </>
              ) : (
                <>
                  <li className="navbar__container-content__data-item">
                    <a
                      className="navbar__container-content__data-link"
                      href="/user/wishlist"
                    >
                      Favourites
                    </a>
                  </li>
                </>
              )}
              <li className="navbar__container-content__data-item">
                <a
                  className="navbar__container-content__data-link"
                  // className="navbar__container-content__data-link-changes"
                  href="/hackspace"
                  disabled
                >
                  Hackspace
                </a>
              </li>
              <li className="navbar__container-content__data-item">
                <button
                  className="navbar__container-content__data-link"
                  onClick={setModalVisible2}
                >
                  CubicleBot
                </button>

                <Modal
                  opened={modalVisible2}
                  onClose={handleModal2Close}
                  title="Cubicle Bot"
                  transitionProps={{ transition: "fade", duration: 200 }}
                  size="lg"
                >
                  <CubicleBot />
                </Modal>
              </li>
              <li className="navbar__container-content__data-item">
                <a
                  className="navbar__container-content__data-links"
                  href="/dashboard"
                >
                  {currentUser?.firstname} {currentUser?.lastname}
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
