import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Replace this with real DB lookup or Directorist data fetch.
    const currentGym = {
      gymName: "Sample Gym",
      ownerName: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      address: "Sample Address",
      description: "Sample gym description",
    };

    return NextResponse.json(currentGym, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Failed to load current gym data." },
      { status: 500 }
    );
  }
}
