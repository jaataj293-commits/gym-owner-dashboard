import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const gymName = String(formData.get("gymName") || "");
    const ownerName = String(formData.get("ownerName") || "");
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");
    const address = String(formData.get("address") || "");
    const description = String(formData.get("description") || "");

    if (!gymName || !ownerName || !email || !phone || !address) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Gym form submitted successfully.",
        data: {
          gymName,
          ownerName,
          email,
          phone,
          address,
          description,
          status: "pending_review",
          submittedAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Failed to submit gym form." },
      { status: 500 }
    );
  }
}
