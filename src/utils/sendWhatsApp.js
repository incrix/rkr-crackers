import axios from "axios";
import FormData from "form-data";

/**
 * Sends an invoice via WhatsApp using the Meta Cloud API.
 * @param {object} params - The parameters for sending the message.
 * @param {object} params.billingDetails - The customer's billing information.
 * @param {string} params.invoice - The base64 encoded PDF invoice.
 */
export const sendWhatsAppInvoice = async ({ billingDetails, invoice }) => {
  // 1. Get required credentials from environment variables
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const fromPhoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const userPhoneNumber = billingDetails.phone;

  // 2. Format the recipient's phone number with the country code
  // WhatsApp requires the country code. Assuming it's for India (+91).
  // You might need a more robust way to handle international numbers.
  const recipientPhoneNumber = `91${userPhoneNumber}`;

  try {
    // ---- STEP A: Upload the PDF to get a Media ID ----

    // Convert the base64 invoice string back to a buffer
    const pdfBuffer = Buffer.from(invoice, "base64");

    const formData = new FormData();
    formData.append("messaging_product", "whatsapp");
    formData.append("file", pdfBuffer, {
      filename: "invoice.pdf",
      contentType: "application/pdf",
    });

    const uploadResponse = await axios.post(
      `https://graph.facebook.com/v18.0/${fromPhoneNumberId}/media`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const mediaId = uploadResponse.data.id;
    if (!mediaId) {
      throw new Error("Media ID not received after PDF upload.");
    }

    // ---- STEP B: Send the message with the uploaded PDF ----

    const messagePayload = {
      messaging_product: "whatsapp",
      to: recipientPhoneNumber,
      type: "document",
      document: {
        id: mediaId,
        caption: `Hi ${billingDetails.name}, here is your order confirmation and invoice. Thank you for your purchase!`,
        filename: "invoice.pdf",
      },
    };

    const messageUrl = `https://graph.facebook.com/v18.0/${fromPhoneNumberId}/messages`;
    await axios.post(messageUrl, messagePayload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("WhatsApp invoice sent successfully to:", recipientPhoneNumber);

  } catch (error) {
    // Log the detailed error from the API for easier debugging
    console.error("Failed to send WhatsApp message:", error.response?.data || error.message);
    // Re-throw the error so the API route can catch it and send a 500 response
    throw new Error("Could not send the WhatsApp message.");
  }
};