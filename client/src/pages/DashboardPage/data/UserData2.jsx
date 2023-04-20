import React, { useEffect, useState } from "react";
import { PortUrl } from "../../../PORTURL";
import FollowCard from "../../../component/Cards/FollowCard";
import axios from "axios";

const UserData2 = ({ user }) => {
  const [users, setUsers] = useState([]);

  const url = PortUrl;

  // const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    Promise.all(
      user.map((item) =>
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

export default UserData2;
