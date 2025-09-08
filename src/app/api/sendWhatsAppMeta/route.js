// src/app/api/sendWhatsAppMeta/route.js
import { sendMetaWhatsAppInvoice } from "@/src/utils/sendWhatsAppMeta";

// Placeholder function for PDF upload.
// Replace this with your actual cloud storage upload logic (e.g., to S3, Cloudinary).
async function uploadPdfAndGetUrl(base64Pdf) {
  console.log("Uploading PDF to cloud for a public URL...");
  // In a real app, you'd upload the file and return the URL.
  // For now, we'll use a dummy URL.
  return "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
}

export async function POST(request) {
  try {
    const { billingDetails, invoice } = await request.json();

    if (!billingDetails || !invoice) {
      return new Response(JSON.stringify({ message: "Missing required data" }), { status: 400 });
    }

    // Get the public URL for the invoice
    const invoiceUrl = await uploadPdfAndGetUrl(invoice);

    // Call our new utility function for Meta's API
    const result = await sendMetaWhatsAppInvoice({
      billingDetails,
      invoiceUrl,
    });

    if (result.success) {
      return new Response(JSON.stringify({ message: "WhatsApp message sent successfully", status: "success" }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "Failed to send WhatsApp message", status: "error", error: result.error }), { status: 500 });
    }

  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ message: "Internal server error", status: "error" }), { status: 500 });
  }
}