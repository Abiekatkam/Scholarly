import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
    },
    postType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", postSchema);
