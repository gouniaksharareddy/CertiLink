const { sendEmail } = require("./gmailService");

// Default message to send when an application is marked as completed
const defaultMessage =
  "Your certificate application has been processed and is now complete. Please check your student portal for more details.";

// Helper to map carriers to their respective email-to-SMS gateways
const carrierGateways = {
  airtel: "airtel.in",
  vodafone: "vodafone.in",
  jio: "jio.com",
  // Add more carriers as needed
};

/**
 * Send SMS via email-to-SMS gateway
 * @param {string} phoneNumber - User's phone number
 * @param {string} carrier - User's carrier (e.g., airtel, jio)
 * @param {string} customMessage - Custom message to send (optional)
 */
async function sendSMS(phoneNumber, carrier, customMessage) {
  try {
    console.log("Starting SMS send process...");

    // Validate phone number
    if (!phoneNumber || !/^\d{10,15}$/.test(phoneNumber)) {
      throw new Error(`Invalid phone number format: ${phoneNumber}`);
    }

    // Validate carrier
    if (!carrier || !carrierGateways[carrier.toLowerCase()]) {
      throw new Error(`Unsupported or missing carrier: ${carrier}`);
    }

    const carrierDomain = carrierGateways[carrier.toLowerCase()];
    const toAddress = `${phoneNumber}@${carrierDomain}`;
    console.log(`Sending SMS to: ${toAddress}`);

    // Send SMS via Gmail
    await sendEmail(toAddress, "", customMessage || defaultMessage);
    console.log("SMS sent successfully!");
  } catch (error) {
    console.error("Error sending SMS:", {
      phoneNumber,
      carrier,
      errorMessage: error.message,
      stack: error.stack,
    });
  }
}

module.exports = sendSMS;
