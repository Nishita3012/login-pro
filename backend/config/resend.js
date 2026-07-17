import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY is not set.");
}

console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY);

console.log(
  "Loaded Resend Key:",
  process.env.RESEND_API_KEY?.slice(0, 10)
);

export const resend = new Resend(process.env.RESEND_API_KEY);