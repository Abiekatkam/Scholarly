import React, { useEffect } from "react";
import "./ShareHack.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import axios from "axios";
import { PortUrl } from "../../PORTURL";
import { postFailure, postStart } from "../../redux/postSlice";

const ShareHack = ({ setPosts }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const [image, setImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const url = PortUrl;
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    image: "",
    userId: "",
    postType: "",
  });
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const imageRef = React.useRef(null);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const handleClose = () => {
    setImage(null);
    setActiveTab(0);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      userId: currentUser?._id,
      postType:
        activeTab === 1
          ? "design"
          : activeTab === 2
          ? "website"
          : activeTab === 3
          ? "blog"
          : "idea",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postStart());
    try {
      await axios.post(`${url}/post/`, {
        ...formData,
        image: imageUrl,
      });
      setFormData(null);
      setImage(null);
      setActiveTab(0);
      window.location.reload();
    } catch (error) {
      console.log(error);
      dispatch(postFailure());
    }
  };

  useEffect(() => {
    image && uploadFile(image);
  }, [image]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.get(`${url}/post/`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComment();
  }, []);

  return (
    <div className="sharehack">
      <div className="sharehack__container">
        <img
          src={currentUser.profileImg || "https://picsum.photos/200"}
          alt="hack post"
        />

        <div className="sharehack__info">
          <h2>Share your hack with us</h2>
          <div>
            <button
              className={
                activeTab === 1
                  ? "sharehack__info-active"
                  : "sharehack__info-button"
              }
              onClick={() => {
                handleTabClick(1);
                imageRef.current.click();
              }}
            >
              Design
            </button>
            <button
              className={
                activeTab === 2
                  ? "sharehack__info-active"
                  : "sharehack__info-button"
              }
              onClick={() => {
                handleTabClick(2);
                imageRef.current.click();
              }}
            >
              Website
            </button>
            <button
              className={
                activeTab === 3
                  ? "sharehack__info-active"
                  : "sharehack__info-button"
              }
              onClick={() => {
                handleTabClick(3);
                imageRef.current.click();
              }}
            >
              Blog
            </button>
            <button
              className={
                activeTab === 4
                  ? "sharehack__info-active"
                  : "sharehack__info-button"
              }
              onClick={() => {
                handleTabClick(4);
                imageRef.current.click();
              }}
            >
              Ideas
            </button>
            <button className="sharehack__info-button" onClick={handleSubmit}>
              Share
            </button>
          </div>
        </div>
      </div>
      <div style={{ display: "none" }}>
        <input
          type="file"
          name="myImage"
          ref={imageRef}
          onChange={onImageChange}
        />
      </div>
      {image && (
        <div className="sharehack__previewImage">
          <i className="fa-sharp fa-solid fa-xmark" onClick={handleClose}></i>
          <div>
            <img src={URL.createObjectURL(image)} alt="preview" />
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Title"
                name="title"
                required
                onChange={handleChange}
              />
              {activeTab === 1 && (
                <>
                  <label htmlFor="description">Description</label>
                  <textarea
                    rows={6}
                    cols={8}
                    name="description"
                    noresize
                    placeholder="Write your description here"
                    onChange={handleChange}
                    required
                  ></textarea>
                </>
              )}
              {activeTab === 2 && (
                <>
                  <label htmlFor="description">Website Url</label>
                  <input
                    type="text"
                    placeholder="Website Url"
                    name="description"
                    onChange={handleChange}
                  />
                </>
              )}
              {activeTab === 3 && (
                <>
                  <label htmlFor="description">Blog Description</label>
                  <textarea
                    rows={6}
                    cols={8}
                    name="description"
                    noresize
                    onChange={handleChange}
                    placeholder="Write your Blog description here"
                  ></textarea>
                </>
              )}
              {activeTab === 4 && (
                <>
                  <label htmlFor="description">Idea Description</label>
                  <textarea
                    rows={6}
                    cols={8}
                    name="description"
                    onChange={handleChange}
                    noresize
                    placeholder="Write your Idea description here"
                  ></textarea>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareHack;
