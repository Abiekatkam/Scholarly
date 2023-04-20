import React from "react";
import PostCard from "../Cards/PostCard";

const HackUser1 = ({ post }) => {
  return (
    <>
      {post.length === 0 ? (
        <p>No post uploaded</p>
      ) : (
        <div>
          {post.map((post, index) => {
            return <PostCard post={post} key={index} />;
          })}
        </div>
      )}
    </>
  );
};

export default HackUser1;
