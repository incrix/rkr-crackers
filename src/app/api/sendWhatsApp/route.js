import { sendWhatsAppInvoice } from "@/src/utils/sendWhatsApp";

export async function POST(request) {
  try {
    const { billingDetails, invoice } = await request.json();

    // Call the utility function to handle all the WhatsApp logic
    await sendWhatsAppInvoice({
      billingDetails,
      invoice,
    });

    return Response.json({
      message: "WhatsApp message sent successfully",
      status: "success",
    });
  } catch (error) {
    console.error("API Error:", error.message);
    return Response.json(
      {
        message: "Failed to send WhatsApp message",
        status: "error",
      },
      { status: 500 }
    );
  }
}