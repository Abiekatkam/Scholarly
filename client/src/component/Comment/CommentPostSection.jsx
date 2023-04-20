import axios from "axios";
import React, { useEffect } from "react";
import { format } from "timeago.js";
import { PortUrl } from "../../PORTURL";
import { useDispatch, useSelector } from "react-redux";
import { removePostComment } from "../../redux/commentPostSlice";

const CommentPostSection = ({ comment }) => {
  const [profile, setProfile] = React.useState([]);
  const [user, setUser] = React.useState([]);

  const url = PortUrl;
  const { currentPost } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(`${url}/users/find/${comment.userId}`);
      const deleteChecking = await axios.get(
        `${url}/users/find/${currentPost?.userId}`
      );
      setUser(deleteChecking.data);
      setProfile(res.data);
    };
    fetchProfile();
  }, [comment]);

  const removeCommentData = async () => {
    try {
      await axios.post(`${url}/commentPost/delete`, {
        commentId: comment?._id,
        postId: currentPost?.userId,
        userId: currentUser?._id,
      });
      dispatch(removePostComment(comment?._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="commentsection">
      <div className="commentsection__avatar">
        <img
          src={profile?.profileImg || "https://picsum.photos/200"}
          alt="avatar"
        />
      </div>
      <div className="commentsection__content">
        <div className="commentsection__content-header">
          <div>
            <h2>
              {profile?.firstname} {profile?.lastname}
            </h2>
            <p>{format(comment.createdAt)}</p>
          </div>
          {user?._id === currentUser?._id && (
            <button onClick={removeCommentData}>
              <i className="fa-solid fa-trash"></i>
            </button>
          )}
        </div>
        <p>{comment.desc}</p>
      </div>
    </div>
  );
};

export default CommentPostSection;
