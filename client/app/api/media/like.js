import mongoose from "mongoose";
import Media from "../../../models/Media";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id } = req.body;

    try {
      await mongoose.connect(process.env.MONGODB_URI);
      const media = await Media.findById(id);
      if (!media) return res.status(404).json({ error: "Media not found" });

      media.likes += 1;
      await media.save();
      res.status(200).json({ success: true, likes: media.likes });
    } catch (error) {
      res.status(500).json({ error: "Failed to update likes" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
