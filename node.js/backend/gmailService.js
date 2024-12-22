const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const path = require("path");

// Path to your service account key
const KEY_FILE_PATH = path.join('backend', "service-account-key.json");

// Gmail scopes
const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

// Load the key file
const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: SCOPES,
});

// Create a Gmail API client
const gmail = google.gmail({ version: "v1", auth });

/**
 * Send an email using Gmail API
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} message - Email message body
 */
async function sendEmail(to, subject = "", message) {
  try {
    console.log("Preparing to send email...");

    // Validate recipient email
    if (!to || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(to)) {
      throw new Error(`Invalid email address: ${to}`);
    }

    // Generate an access token
    const accessToken = await auth.getAccessToken();
    if (!accessToken.token) {
      throw new Error("Failed to retrieve access token");
    }

    // Create a transporter using Nodemailer with Gmail OAuth2
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "your-email@gmail.com", // Replace with your email address
        clientId: auth.clientId,
        clientSecret: auth.clientSecret,
        refreshToken: auth.credentials ? auth.credentials.refresh_token : null,
        accessToken: accessToken.token,
      },
    });

    // Mail options
    const mailOptions = {
      from: "your-email@gmail.com", // Replace with your email address
      to,
      subject: subject || "Notification from CertiLink", // Default subject if not provided
      text: message,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", {
      to,
      subject,
      message,
      errorMessage: error.message,
      stack: error.stack,
    });
    throw error; // Re-throw error for higher-level handling if needed
  }
}

module.exports = { sendEmail };
