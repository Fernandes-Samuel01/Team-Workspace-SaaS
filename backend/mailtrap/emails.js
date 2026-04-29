import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplate.js";

import { mailtrapClient, sender } from "./mailtrap.config.js";

// ✅ Verification Email
export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("✅ Verification Email sent", response);
    return response;
  } catch (error) {
    console.error("❌ Error sending Verification Email:", error.message);
    return null; // ✅ IMPORTANT: don't break signup
  }
};

// ✅ Welcome Email
export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "d297f0a7-a26d-4624-b980-e2aac34f8625",
      template_variables: {
        company_info_name: "MERN Auth",
        name: name,
      },
    });

    console.log("✅ Welcome Email sent", response);
    return response;
  } catch (error) {
    console.error("❌ Error sending Welcome Email:", error.message);
    return null; // ✅ IMPORTANT
  }
};

// ✅ Password Reset Email
export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
        "{resetURL}",
        resetURL
      ),
      category: "Password Reset",
    });

    console.log("✅ Password reset email sent", response);
    return response;
  } catch (error) {
    console.error("❌ Error sending password reset email:", error.message);
    return null;
  }
};

// ✅ Reset Success Email
export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password",
    });

    console.log("✅ Reset success email sent", response);
    return response;
  } catch (error) {
    console.error(
      "❌ Error sending password reset success email:",
      error.message
    );
    return null;
  }
};