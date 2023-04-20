import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { PortUrl } from "../../PORTURL";
import { follow } from "../../redux/userSlice";

import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

const FollowersCard = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const url = PortUrl;
  const [users, setUsers] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUSer = async () => {
      const resp = await axios.get(`${url}/users/getalluser`);
      setUsers(resp.data);
    };
    fetchUSer();
  }, []);

  const handleFollow = async (user) => {
    try {
      if (currentUser.following.includes(user)) {
        await axios.post(`${url}/users/follow`, {
          userId: currentUser._id,
          anonymousId: user,
        });
        dispatch(follow(user));
      } else {
        await axios.post(`${url}/users/follow`, {
          userId: currentUser._id,
          anonymousId: user,
        });
        dispatch(follow(user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="followerscard">
      <h3>People you might know</h3>

      {users
        .filter((user) => user._id !== currentUser._id)
        .slice(0, 4)
        .map((user) => (
          <div className="followerscard__container">
            <div>
              <img
                src={user.profileImg || "https://picsum.photos/200"}
                alt="profile"
              />
              <a href={`hackspace/user/${user?._id}`}>
                {user.firstname} {user.lastname}
              </a>
            </div>

            <button
              className={
                currentUser?.following.includes(user?._id)
                  ? "followerscard__container-unfollow"
                  : "followerscard__container-follow"
              }
              onClick={() => handleFollow(user._id)}
            >
              {currentUser.following.includes(user?._id)
                ? "Unfollow"
                : "Follow"}
            </button>
          </div>
        ))}

      <button onClick={open}>show more</button>

      <Modal opened={opened} onClose={close} title="User's List" size="lg">
        <div className="followerscard-modal">
          {users
            .filter((user) => user._id !== currentUser._id)
            .map((user) => (
              <div className="followerscard__container">
                <div>
                  <img
                    src={user.profileImg || "https://picsum.photos/200"}
                    alt="profile"
                  />
                  <a href={`hackspace/user/${user?._id}`}>
                    {user.firstname} {user.lastname}
                  </a>
                </div>

                <button
                  className={
                    currentUser?.following.includes(user?._id)
                      ? "followerscard__container-unfollow"
                      : "followerscard__container-follow"
                  }
                  onClick={() => handleFollow(user._id)}
                >
                  {currentUser.following.includes(user?._id)
                    ? "Unfollow"
                    : "Follow"}
                </button>
              </div>
            ))}
        </div>
      </Modal>
    </div>
  );
};

export default FollowersCard;
