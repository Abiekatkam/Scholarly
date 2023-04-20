import React, { useEffect, useState } from "react";
import "./PostCard.css";
import { PortUrl } from "../../PORTURL";
import axios from "axios";

const PostCard = ({ post }) => {
  const [user, setUser] = useState("");
  const url = PortUrl;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${url}/users/find/${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post]);

  return (
    <div className="postcard">
      <a href={`/hackspace/post/${post?._id}`}>
        <img src={post.image || "https://picsum.photos/200"} alt="post card" />
      </a>
      <div className="postcard__info">
        <div>
          <h2>{post.title}</h2>
          <div>
            <h5>{user.firstname}</h5>
            <p>{post?.likes.length} likes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
