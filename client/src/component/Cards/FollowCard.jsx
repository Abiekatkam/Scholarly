import React from "react";
import "./FollowCard.css";
import { useDispatch, useSelector } from "react-redux";
import { follow } from "../../redux/userSlice";
import axios from "axios";
import { PortUrl } from "../../PORTURL";

const FollowCard = ({ user }) => {
  const { currentUser } = useSelector((state) => state.user);

  const url = PortUrl;
  const dispatch = useDispatch();

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

  return (
    <div className="followcard__container">
      <a href={`/hackspace/user/${user?._id}`}>
        <img src={user?.profileImg || "https://picsum.photos/200"} alt={""} />
        <h1>{user?.firstname}</h1>
      </a>
      <button
        className={
          currentUser?.following.includes(user?._id)
            ? "contentpage__button-unfollow"
            : "contentpage__button-follow"
        }
        style={currentUser?._id === user?._id ? { display: "none" } : null}
        onClick={handleFollow}
      >
        {currentUser?.following.includes(user?._id) ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default FollowCard;
