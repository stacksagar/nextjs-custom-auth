import { redirect } from "next/navigation";

export function GET() {
  return redirect("/");
  return new Response("Invalid path");
}
