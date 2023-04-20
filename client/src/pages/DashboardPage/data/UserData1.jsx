import React from "react";
import PostCard from "../../../component/Cards/PostCard";

const UserData1 = ({ post }) => {
  return (
    <>
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
    </>
  );
};

export default UserData1;
