import Stack from "@mui/material/Stack";
import CartPage from "./Components/cartPage";
import NavBar from "@/src/app/Components/HomePage/navBar";
import Footer from "@/src/app/Components/HomePage/footer";

export default function Cart() {
  return (
    <Stack>
      <NavBar />
      <Stack sx={{
        px: { xs: 0, md: 3 },
        mx: { xs: 1, md: 3 },
        mt: { xs: 12, md: 12 },
      }}>
      <CartPage />
      </Stack>
      <Footer />
    </Stack>
  );
}

