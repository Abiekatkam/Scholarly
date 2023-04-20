import React, { useEffect, useState } from "react";
import FollowCard from "../Cards/FollowCard";
import { PortUrl } from "../../PORTURL";
import axios from "axios";
import { useSelector } from "react-redux";

const HackUser2 = ({ user }) => {
  const [users, setUsers] = useState([]);

  const url = PortUrl;

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const filterArray = user.filter((item) => item !== currentUser?._id);
    Promise.all(
      filterArray.map((item) =>
        axios.get(`${url}/users/find/${item}`).then((response) => response.data)
      )
    )
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, [user]);

  return (
    <>
      {user.length === 0 ? (
        <p>Create a bond with each other, for upgrading yourself quickly.</p>
      ) : (
        <div>
          {users.map((item, index) => {
            return <FollowCard user={item} key={index} />;
          })}
        </div>
      )}
    </>
  );
};

export default HackUser2;
