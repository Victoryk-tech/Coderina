import mongoose from "mongoose";
import Media from "../../../models/media";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id, user, text } = req.body;

    try {
      await mongoose.connect(process.env.MONGODB_URI);
      const media = await Media.findById(id);
      if (!media) return res.status(404).json({ error: "Media not found" });

      media.comments.push({ user, text });
      await media.save();
      res.status(200).json({ success: true, comments: media.comments });
    } catch (error) {
      res.status(500).json({ error: "Failed to add comment" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
