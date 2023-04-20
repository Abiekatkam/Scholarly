import React from "react";
import "./ProfileCard.css";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="profilecard">
      <img
        src={currentUser.profileImg || "https://picsum.photos/200"}
        alt="profile"
      />
      <div className="profilecard__desc">
        <h1>
          {currentUser.firstname} {currentUser.lastname}
        </h1>
        <p>{currentUser.bio || "Bio"}</p>
        <div>
          <p>{currentUser.follower.length} Followers</p>
          <p>{currentUser.following.length} Following</p>
        </div>
      </div>
      <a href="/dashboard">My profile</a>
    </div>
  );
};

export default ProfileCard;
