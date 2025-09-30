import { sendVerificationMail } from "@/src/utils/sendMail";

export async function POST(request) {
  try {
    const { billingDetails, productList, invoice } = await request.json();
    await sendVerificationMail({
      billingDetails,
      invoice,
    });
    
    return Response.json({
      message: "Order placed successfully",
      status: "success",
    });

  } catch (error) {
    // This will log the detailed error to your Vercel Logs
    console.error("API Error: Failed to send mail:", error); 
    
    // Return a structured error response to the client
    return new Response(
      JSON.stringify({ message: "Failed to place order.", status: "error" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}