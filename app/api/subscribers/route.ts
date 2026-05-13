import { NextResponse } from "next/server";
import { readSubscribers } from "@/lib/subscribers";

export async function GET() {
  const subscribers = readSubscribers();
  return NextResponse.json({ subscribers, total: subscribers.length });
}
