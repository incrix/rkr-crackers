import { sendVerificationMail } from "@/src/utils/sendMail";

export async function POST(request) {
  const { billingDetails, productList, invoice } = await request.json();
  await sendVerificationMail({
    billingDetails,
    invoice,
  });
  // console.log("Order placed successfully", billingDetails, productList, invoice);
  return Response.json({
    message: "Order placed successfully",
    status: "success",
  });
}
