import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Registration from "@/app/models/registration";

export async function POST(req) {
  await dbConnect();

  try {
    const {
      team,
      captain: { firstName, lastName, email, institution, country },
      termsAccepted,
      teamMember2 = {}, // Default to empty object if not provided
      teamMember3 = {}, // Default to empty object if not provided
    } = await req.json();

    // Prepare registration data to include optional fields only if they have values
    const registrationData = {
      team,
      captain: { firstName, lastName, email, institution, country },
      termsAccepted,
    };

    if (Object.keys(teamMember2).length > 0)
      registrationData.teamMember2 = teamMember2;
    if (Object.keys(teamMember3).length > 0)
      registrationData.teamMember3 = teamMember3;

    // Create a new registration entry in the database
    const newRegistration = new Registration(registrationData);
    await newRegistration.save();

    return NextResponse.json(
      { message: "Registration successful" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error saving registration", error: error.message },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
