import React, { useState } from "react";
import ShareHack from "../../../component/HackComponent/ShareHack";
import PostCard from "../../../component/Cards/PostCard";

const HackSpace2 = () => {
  const [posts, setPosts] = useState([]);

  return (
    <div className="hackspace2">
      <ShareHack setPosts={setPosts} />
      <div className="hackspace2__container">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HackSpace2;
