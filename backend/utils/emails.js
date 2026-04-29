import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "../mailtrap/emailTemplate.js";

// ✅ Gmail SMTP transporter (FIXED)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER?.trim(),
    pass: process.env.EMAIL_PASS?.trim(),
  },
});

console.log("USER:", JSON.stringify(process.env.EMAIL_USER));
console.log("PASS:", JSON.stringify(process.env.EMAIL_PASS));

// ✅ Debug (will confirm working)
// transporter.verify((error, success) => {
//   if (error) {
//     console.log("❌ SMTP Error:", error);
//   } else {
//     console.log("✅ SMTP Ready");
//   }
// });

// ✅ Verification Email
export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const html = VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken
    );

    const response = await transporter.sendMail({
      from: `"MERN Auth" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email",
      html,
    });

    console.log("✅ Verification Email sent");
    return response;
  } catch (error) {
    console.error("❌ Email Error:", error.message);
    return null;
  }
};

// ✅ Welcome Email
export const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: `"MERN Auth" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to MERN Auth 🎉",
      html: `<h2>Welcome ${name}!</h2><p>Your account is ready.</p>`,
    });

    console.log("✅ Welcome Email sent");
    return response;
  } catch (error) {
    console.error("❌ Email Error:", error.message);
    return null;
  }
};

// ✅ Password Reset Email
export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
      "{resetURL}",
      resetURL
    );

    const response = await transporter.sendMail({
      from: `"MERN Auth" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html,
    });

    console.log("✅ Password reset email sent");
    return response;
  } catch (error) {
    console.error("❌ Email Error:", error.message);
    return null;
  }
};

// ✅ Reset Success Email
export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await transporter.sendMail({
      from: `"MERN Auth" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });

    console.log("✅ Reset success email sent");
    return response;
  } catch (error) {
    console.error("❌ Email Error:", error.message);
    return null;
  }
};