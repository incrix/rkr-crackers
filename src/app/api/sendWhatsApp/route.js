import { uploadPDFtoWhatsApp, sendWhatsAppPDF } from "@/src/utils/whatsapp";

export async function POST(request) {
  const { billingDetails, invoice } = await request.json();

  // 1. Upload PDF to WhatsApp servers
  const mediaId = await uploadPDFtoWhatsApp({
    base64PDF: invoice,
    fileName: "invoice.pdf"
  });

  // 2. Send document + structured message with billing info
  const message = 
    `Hi ${billingDetails.name},\nThank you for your order!\n\n` +
    `Here are your billing details:\n` +
    `Name: ${billingDetails.name}\nEmail: ${billingDetails.email}\n` +
    `Phone: ${billingDetails.phone}\nAddress: ${billingDetails.address}, ${billingDetails.city}, ${billingDetails.state} - ${billingDetails.zip}\n\n` +
    `Your invoice PDF is attached.`;

  await sendWhatsAppPDF({
    recipientPhone: `91${billingDetails.phone}`, // Change 91 to your country code
    mediaId,
    fileName: "invoice.pdf",
    caption: message
  });

  return Response.json({
    message: "Order placed and WhatsApp sent successfully",
    status: "success",
  });
}
