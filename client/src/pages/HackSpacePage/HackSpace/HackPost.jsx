import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar/Navbar";
import ShapeWave from "../../../component/ShapeFiles/ShapeWave";
import Footer from "../../../component/Footer/Footer";

import "./style/HackPost.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PortUrl } from "../../../PORTURL";
import axios from "axios";
import { postLikes, postSuccess } from "../../../redux/postSlice";
import { follow } from "../../../redux/userSlice";
import CommentPost from "../../../component/Comment/CommentPost";

const HackPost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentPost } = useSelector((state) => state.post);

  const params = useParams();
  const dispatch = useDispatch();

  const url = PortUrl;

  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`${url}/post/find/${params.id}`);
      dispatch(postSuccess(res.data));
    };
    fetchPost();

    const fetchUser = async () => {
      const res = await axios.get(`${url}/users/find/${currentPost?.userId}`);
      setUsers(res.data);
    };
    fetchUser();
  }, [params.id]);

  const handleLikes = async () => {
    try {
      if (currentPost.likes?.includes(currentUser._id)) {
        await axios.post(`${url}/post/likes`, {
          userId: currentUser._id,
          postId: currentPost?._id,
        });
        dispatch(postLikes(currentUser?._id));
      } else {
        await axios.post(`${url}/post/likes`, {
          userId: currentUser._id,
          postId: currentPost?._id,
        });
        dispatch(postLikes(currentUser?._id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async () => {
    try {
      if (currentUser.following.includes(users?._id)) {
        await axios.post(`${url}/users/follow`, {
          userId: currentUser._id,
          anonymousId: users._id,
        });
        dispatch(follow(users._id));
      } else {
        await axios.post(`${url}/users/follow`, {
          userId: currentUser._id,
          anonymousId: users._id,
        });
        dispatch(follow(users._id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="hackpost">
        <div className="hackpost__container">
          <div className="hackpost__container-content">
            <img src={currentPost?.image} alt="post" />
            <div>
              <div>
                <img
                  src={users?.profileImg || "https://picsum.photos/200"}
                  alt=""
                />
                <div>
                  <a href={`/hackspace/user/${users?._id}`}>
                    {users?.firstname} {users?.lastname}
                  </a>
                  <div>
                    <span>post likes: {currentPost?.likes.length} </span>
                  </div>
                </div>
              </div>
              <button onClick={handleLikes} className="hackpost__button-like">
                {currentPost?.likes?.includes(currentUser?._id) ? (
                  <i className="fa-solid fa-heart"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </button>
              <button
                className={
                  currentUser?.following.includes(users?._id)
                    ? "contentpage__button-unfollow"
                    : "contentpage__button-follow"
                }
                style={
                  currentUser?._id === users?._id ? { display: "none" } : null
                }
                onClick={handleFollow}
              >
                {currentUser?.following.includes(users?._id)
                  ? "Unfollow"
                  : "Follow"}
              </button>
            </div>
          </div>

          <div className="hackpost__container-conment">
            <div>
              <h1>{currentPost?.title}</h1>
              <span>{currentPost?.postType}</span>
            </div>
            {currentPost?.postType === "website" ? (
              <a
                href={currentPost?.description}
                target="_blank"
                rel="noreferrer"
              >
                Visit site
              </a>
            ) : (
              <p>{currentPost?.description}</p>
            )}

            {currentPost?.postType !== "blog" && (
              <CommentPost postId={params.id} />
            )}
          </div>
        </div>
      </div>
      <ShapeWave />
      <Footer />
    </>
  );
};

export default HackPost;
