import React, { useEffect } from "react";
import CommentSection from "./CommentSection";
import "./Comment.css";

import { useDispatch, useSelector } from "react-redux";
import { PortUrl } from "../../PORTURL";
import axios from "axios";
import {
  commentFailure,
  commentOnLoad,
  commentStart,
  commentSuccess,
} from "../../redux/commentSlice";

const Comment = ({ videoId }) => {
  const [description, setDescription] = React.useState("");

  const { currentUser } = useSelector((state) => state.user);
  const { currentComment } = useSelector((state) => state.comment);
  const { currentCourse } = useSelector((state) => state.course);

  const url = PortUrl;
  const dispatch = useDispatch();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    dispatch(commentStart([]));

    try {
      const comment = {
        videoId: currentCourse?._id,
        userId: currentUser._id,
        desc: description,
      };

      const res = await axios.post(`${url}/comment`, comment);
      console.log(res.data);
      dispatch(commentOnLoad(res.data));
    } catch (error) {
      console.log(error);
      dispatch(commentFailure([]));
    }

    setDescription("");
  };

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.get(`${url}/comment/${currentCourse?._id}`);
        dispatch(commentSuccess(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchComment();
  }, [currentCourse?._id]);

  return (
    <div className="comment">
      <div className="comment__avatar">
        <img
          src={currentUser.profileImg || "https://picsum.photos/200"}
          alt="avatar"
        />
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="Drop your query here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit">
            <i className="fa-solid fa-rocket"></i>
          </button>
        </form>
      </div>
      <div
        className={
          currentComment.length === 0 ? "comment__display" : "comment__content"
        }
      >
        {currentComment
          .map((comment) => (
            <CommentSection key={comment._id} comment={comment} />
          ))
          .sort((a, b) => a.createdAt - b.createdAt)}
      </div>
    </div>
  );
};

export default Comment;
