import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

import { resend } from "../config/resend.js";

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    console.log(`Sending verification email from ${FROM_EMAIL} to ${email}`);
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken,
      ),
    });

    console.log("Verification email sent:", response);
  } catch (error) {
    console.error(
      "Verification email error:",
      error?.response?.body || error?.message || error,
    );
    throw error;
  }
};

export const sendwelcomeEmail = async (email, name) => {
  try {
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Welcome!",
      html: `
        <h2>Welcome ${name}! 🎉</h2>
        <p>Your account has been created successfully.</p>
      `,
    });

    console.log("Welcome email sent:", response);
  } catch (error) {
    console.error("Welcome email error:", error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    });

    console.log("Password reset email sent:", response);
  } catch (error) {
    console.error("Password reset email error:", error);
    throw error;
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });

    console.log("Password reset success email sent:", response);
  } catch (error) {
    console.error("Reset success email error:", error);
    throw error;
  }
};
