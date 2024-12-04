import dbConnect from "../../../app/utility/dbConnect";
import Media from "../../models/medias";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const media = await Media.findById(id);
        if (!media) {
          return res
            .status(404)
            .json({ success: false, message: "Media not found" });
        }
        res.status(200).json({ success: true, data: media });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "PUT":
      try {
        const media = await Media.findByIdAndUpdate(id, req.body, {
          new: true, // Return the updated document
          runValidators: true, // Ensure the updated data is valid
        });
        if (!media) {
          return res
            .status(404)
            .json({ success: false, message: "Media not found" });
        }
        res.status(200).json({ success: true, data: media });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "DELETE":
      try {
        const media = await Media.findByIdAndDelete(id);
        if (!media) {
          return res
            .status(404)
            .json({ success: false, message: "Media not found" });
        }
        res
          .status(200)
          .json({ success: true, message: "Media deleted successfully" });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
