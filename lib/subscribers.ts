import fs from "fs";
import path from "path";

export interface Subscriber {
  email: string;
  subscribedAt: string;
}

const DB_PATH = path.join(process.cwd(), "data", "subscribers.json");

export function readSubscribers(): Subscriber[] {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw) as Subscriber[];
  } catch {
    return [];
  }
}

export function writeSubscribers(subscribers: Subscriber[]): void {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(subscribers, null, 2));
  } catch {
    // Vercel and other serverless environments have a read-only filesystem — log and continue
    console.warn("[subscribers] Could not write subscribers file (read-only fs).");
  }
}

export function addSubscriber(email: string): { success: boolean; alreadyExists: boolean } {
  const subscribers = readSubscribers();
  const exists = subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase());
  if (exists) return { success: false, alreadyExists: true };
  subscribers.push({ email, subscribedAt: new Date().toISOString() });
  writeSubscribers(subscribers);
  return { success: true, alreadyExists: false };
}
