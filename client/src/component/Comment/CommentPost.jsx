import React, { useEffect } from "react";
import "./Comment.css";

import { useDispatch, useSelector } from "react-redux";
import { PortUrl } from "../../PORTURL";
import axios from "axios";
import {
  commentPostOnLoad,
  commentPostStart,
  commentPostSuccess,
  commentPostFailure,
} from "../../redux/commentPostSlice";
import CommentPostSection from "./CommentPostSection";

const CommentPost = ({ postId }) => {
  const [description, setDescription] = React.useState("");

  const { currentUser } = useSelector((state) => state.user);
  const { currentPost } = useSelector((state) => state.post);
  const { currentCommentPost } = useSelector((state) => state.commentPost);

  const url = PortUrl;
  const dispatch = useDispatch();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    dispatch(commentPostStart());

    try {
      const comment = {
        postId: currentPost?._id,
        userId: currentUser._id,
        desc: description,
      };

      const res = await axios.post(`${url}/commentpost`, comment);
      dispatch(commentPostOnLoad(res.data));
    } catch (error) {
      console.log(error);
      dispatch(commentPostFailure());
    }

    setDescription("");
  };

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.get(`${url}/commentpost/${currentPost?._id}`);
        dispatch(commentPostSuccess(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchComment();
  }, [currentPost?._id]);

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
            placeholder="write down your comment here..."
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
          currentCommentPost.length === 0
            ? "comment__display"
            : "comment__content"
        }
      >
        {currentCommentPost
          .map((comment) => (
            <CommentPostSection key={comment._id} comment={comment} />
          ))
          .sort((a, b) => a.createdAt - b.createdAt)}
      </div>
    </div>
  );
};

export default CommentPost;
