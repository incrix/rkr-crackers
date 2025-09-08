// src/utils/sendWhatsAppMeta.js

const accessToken = process.env.META_WHATSAPP_TOKEN;
const phoneNumberId = process.env.META_PHONE_NUMBER_ID;

// This function sends a pre-approved template message with a PDF document.
export const sendMetaWhatsAppInvoice = async ({ billingDetails, invoiceUrl }) => {
  // The recipient's number should not have a '+' or 'whatsapp:' prefix.
  // It should be the country code + number (e.g., 919876543210).
  const recipientPhoneNumber = `91${billingDetails.phone}`;

  // Format the billing details for the message body variable
  const billingInfoText = `Name: ${billingDetails.name}, Phone: ${billingDetails.phone}, Address: ${billingDetails.address}, ${billingDetails.city}`;

  const messagePayload = {
    messaging_product: "whatsapp",
    to: recipientPhoneNumber,
    type: "template",
    template: {
      name: "order_confirmation_invoice", // The template name you created in Meta Business Manager
      language: {
        code: "en_US",
      },
      components: [
        {
          // The Header component is for the PDF attachment
          type: "header",
          parameters: [
            {
              type: "document",
              document: {
                link: invoiceUrl, // Must be a public URL
                filename: "invoice.pdf",
              },
            },
          ],
        },
        {
          // The Body component is for the text variables {{1}} and {{2}}
          type: "body",
          parameters: [
            {
              type: "text",
              text: billingDetails.name, // This replaces {{1}}
            },
            {
              type: "text",
              text: billingInfoText, // This replaces {{2}}
            },
          ],
        },
      ],
    },
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messagePayload),
      }
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(JSON.stringify(data.error));
    }

    console.log("Meta WhatsApp message sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Error sending Meta WhatsApp message:", error.message);
    return { success: false, error: error.message };
  }
};