import { Resend } from "resend";

console.log(
  "Loaded Resend Key:",
  process.env.RESEND_API_KEY?.slice(0, 12)
);

export const resend = new Resend(process.env.RESEND_API_KEY);

try {
  const domains = await resend.domains.list();
  console.log("Resend authentication successful:", domains);
} catch (err) {
  console.error("Resend authentication failed:", err);
}