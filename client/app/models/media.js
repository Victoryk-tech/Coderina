import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const MediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: { type: [CommentSchema], default: [] },
});

export default mongoose.models.Media || mongoose.model("Media", MediaSchema);
