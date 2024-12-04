import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  team: { type: String, required: true },
  captain: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    institution: { type: String, required: true },
    country: { type: String, required: true },
  },
  teamMember2: {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String, default: "" },
  },
  teamMember3: {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String, default: "" },
  },
  termsAccepted: { type: Boolean, required: true },
});

const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);

export default Registration;
