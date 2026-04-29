// import nodemailer from "nodemailer";

// import {
//   PASSWORD_RESET_REQUEST_TEMPLATE,
//   PASSWORD_RESET_SUCCESS_TEMPLATE,
//   VERIFICATION_EMAIL_TEMPLATE,
// } from "./emailTemplate.js";

// // ✅ Create transporter (Gmail SMTP)
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // ✅ Verification Email
// export const sendVerificationEmail = async (email, verificationToken) => {
//   try {
//     const htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace(
//       "{verificationCode}",
//       verificationToken
//     );

//     const response = await transporter.sendMail({
//       from: `"MERN Auth" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Verify Your Email",
//       html: htmlContent,
//     });

//     console.log("✅ Verification Email sent", response);
//     return response;
//   } catch (error) {
//     console.error("❌ Error sending Verification Email:", error.message);
//     return null;
//   }
// };

// // ✅ Welcome Email
// export const sendWelcomeEmail = async (email, name) => {
//   try {
//     const response = await transporter.sendMail({
//       from: `"MERN Auth" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Welcome to MERN Auth 🎉",
//       html: `<h2>Welcome, ${name}!</h2><p>Your account has been created successfully.</p>`,
//     });

//     console.log("✅ Welcome Email sent", response);
//     return response;
//   } catch (error) {
//     console.error("❌ Error sending Welcome Email:", error.message);
//     return null;
//   }
// };

// // ✅ Password Reset Email
// export const sendPasswordResetEmail = async (email, resetURL) => {
//   try {
//     const htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
//       "{resetURL}",
//       resetURL
//     );

//     const response = await transporter.sendMail({
//       from: `"MERN Auth" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Reset Your Password",
//       html: htmlContent,
//     });

//     console.log("✅ Password reset email sent", response);
//     return response;
//   } catch (error) {
//     console.error("❌ Error sending password reset email:", error.message);
//     return null;
//   }
// };

// // ✅ Reset Success Email
// export const sendResetSuccessEmail = async (email) => {
//   try {
//     const response = await transporter.sendMail({
//       from: `"MERN Auth" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Password reset successful",
//       html: PASSWORD_RESET_SUCCESS_TEMPLATE,
//     });

//     console.log("✅ Reset success email sent", response);
//     return response;
//   } catch (error) {
//     console.error(
//       "❌ Error sending password reset success email:",
//       error.message
//     );
//     return null;
//   }
// };