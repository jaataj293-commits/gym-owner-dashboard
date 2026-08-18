import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const gymName = String(body.gymName || "");
    const ownerName = String(body.ownerName || "");
    const email = String(body.email || "");
    const phone = String(body.phone || "");
    const address = String(body.address || "");
    const description = String(body.description || "");

    if (!gymName || !ownerName || !email || !phone || !address) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    // TODO: Replace this with your real database update or Directorist update logic.
    const updatedGym = {
      gymName,
      ownerName,
      email,
      phone,
      address,
      description,
      status: "pending_review",
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        message: "Gym form updated successfully.",
        data: updatedGym,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Failed to update gym form." },
      { status: 500 }
    );
  }
}
