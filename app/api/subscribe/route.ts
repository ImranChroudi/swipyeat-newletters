import { NextRequest, NextResponse } from "next/server";
import { addSubscriber } from "@/lib/subscribers";
import { sendWelcomeEmail } from "@/lib/mailer";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email: string = (body?.email ?? "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ message: "Email is required." }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ message: "Invalid email address." }, { status: 400 });
    }

    addSubscriber(email);

    sendWelcomeEmail(email).catch((err) =>
      console.error("[mailer] Failed to send welcome email:", err)
    );

    return NextResponse.json(
      { message: "Subscribed successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("[subscribe] Unexpected error:", err);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
