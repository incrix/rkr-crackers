"use client";
import NavBar from "@/src/app/Components/HomePage/navBar";
import Footer from "@/src/app/Components/HomePage/footer";
import Stack from "@mui/material/Stack";
import CheckoutPage from "@/src/app/Checkout/Components/checkOutPage";




export default function Checkout() {
  return (
    <Stack>
      <NavBar />
      <Stack
         sx={{
            px: { xs: 0, md: 3 },
            mx: { xs: 1, md: 3 },
            mt: { xs: 12, md: 12 },
          }}
      >
       <CheckoutPage />         
      </Stack>
      <Footer />
    </Stack>
  );
}

