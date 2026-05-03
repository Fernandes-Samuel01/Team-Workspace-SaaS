import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "../mailtrap/emailTemplate.js";

// ✅ MAILTRAP SMTP (REPLACED GMAIL)
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

// ❌ REMOVE THESE (security risk)
// console.log("USER:", JSON.stringify(process.env.EMAIL_USER));
// console.log("PASS:", JSON.stringify(process.env.EMAIL_PASS));

// ✅ Verification Email
export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const html = VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken
    );

    const response = await transporter.sendMail({
      from: '"MERN SaaS" <no-reply@mern.com>',
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
      from: '"MERN SaaS" <no-reply@mern.com>',
      to: email,
      subject: "Welcome 🎉",
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
      from: '"MERN SaaS" <no-reply@mern.com>',
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
      from: '"MERN SaaS" <no-reply@mern.com>',
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