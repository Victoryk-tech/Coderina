import dbConnect from "../../../app/utility/dbConnect";
import Media from "../../models/media";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const media = await Media.find(); // Retrieve all media
        res.status(200).json({ success: true, data: media });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "POST":
      try {
        const media = await Media.create(req.body); // Create new media
        res.status(201).json({ success: true, data: media });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
