import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY is not set. Email sending will fail.");
}

export const resend = new Resend(process.env.RESEND_API_KEY);
