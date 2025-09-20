"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { Quicksand } from "next/font/google";
const quicksand = Quicksand({ subsets: ["latin"] });
import { useState, useEffect } from "react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { pdf } from "@react-pdf/renderer";
import Template1 from "@/src/utils/invoice/Template1/Template";
import LoadingButton from "@mui/lab/LoadingButton";
import { launchFireworks } from "@/src/app/Components/Confetti/confetti";
import { useRouter } from "next/navigation";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "var(--border-color)",
    color: theme.palette.common.white,
    fontWeight: 800,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  //   "&:nth-of-type(odd)": {
  // backgroundColor: "white",
  //   },
  "& td, & th": {
    borderBottom: "1px solid var(--border-color)",
  },
}));

export default function Page() {
  const [checkoutState, setCheckoutState] = useState("billing");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const onBillingDetailsChange = (e) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
    localStorage.setItem(
      "billingDetails",
      JSON.stringify({ ...billingDetails, [e.target.name]: e.target.value })
    );
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    const stored = localStorage.getItem("billingDetails");
    if (stored) {
      setBillingDetails(JSON.parse(stored));
    }
  }, []);

  // Keep localStorage updated whenever billingDetails changes
  useEffect(() => {
    localStorage.setItem("billingDetails", JSON.stringify(billingDetails));
  }, [billingDetails]);

  // This function will show the snackbar for the billing form
  const showBillingError = (message) => {
    setSnackbar({ open: true, message: message, severity: "error" });
  };

  // This function will be passed to OrderSummary to show the success snackbar
  const showOrderSuccess = (message) => {
    setSnackbar({ open: true, message: message, severity: "success" });
  };

  const handleNextClick = () => {
    if (
      !billingDetails.name ||
      !billingDetails.email ||
      !billingDetails.phone ||
      !billingDetails.address ||
      !billingDetails.city ||
      !billingDetails.state ||
      !billingDetails.zip
    ) {
      showBillingError("Please fill all the fields");
      return;
    }
    if (billingDetails.phone.length !== 10) {
      showBillingError("Please enter a valid phone number");
      return;
    }
    if (billingDetails.zip.length !== 6) {
      showBillingError("Please enter a valid zip code");
      return;
    }
    if (billingDetails.email.indexOf("@") === -1) {
      showBillingError("Please enter a valid email");
      return;
    }
    setCheckoutState("order");
  };
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: { xs: 0, md: 3 },
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Stack
        sx={{
          width: "100%",
          maxWidth: "100%",
          padding: "40px 0",
          gap: 5,
        }}
      >
        <Typography
          className={quicksand.className}
          variant="h1"
          fontSize={40}
          fontWeight={800}
          textAlign={"center"}
        >
          Checkout
        </Typography>
        <StepIndicator checkoutState={checkoutState} />
        {checkoutState == "billing" && (
          <BillingDetails
            handleClick={handleNextClick}
            billingDetails={billingDetails}
            onBillingDetailsChange={onBillingDetailsChange}
          />
        )}
        {checkoutState == "order" && (
          <OrderSummary
            setCheckoutState={setCheckoutState}
            showOrderSuccess={showOrderSuccess}
            showError={showBillingError}
          />
        )}
      </Stack>
    </Stack>
  );
}

function OrderSummary({ setCheckoutState, showOrderSuccess, showError }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const totalAmount = cart.reduce(
    (acc, item) =>
      acc +
      Math.round(
        (item.price - (item.price * item.discount) / 100) * item.count
      ),
    0
  );

  const handlePlaceOrder = async () => {
    if (totalAmount <= 3000) {
      showError("The total amount must be above ₹3000 to place an order.");
      return;
    }

    setLoading(true);

    const pdfStream = await pdf(
      <Template1
        billingDetails={JSON.parse(localStorage.getItem("billingDetails"))}
        productList={cart}
      />
    ).toBuffer();

    const chunks = [];
    pdfStream.on("data", (chunk) => chunks.push(chunk));
    pdfStream.on("end", async () => {
      const pdfBuffer = Buffer.concat(chunks);
      const base64String = pdfBuffer.toString("base64");

      fetch("/api/sendmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          billingDetails: JSON.parse(localStorage.getItem("billingDetails")),
          productList: cart,
          invoice: base64String,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            showOrderSuccess("Order placed successfully 🎉");
            launchFireworks();
            localStorage.removeItem("cart");
            localStorage.removeItem("billingDetails");
            setCheckoutState("billing");
            router.push("/Shop");
          } else {
            showError("Failed to place order. Please try again.");
          }
        })
        .catch(() => {
          showError("An error occurred. Please check your connection.");
        })
        .finally(() => setLoading(false));
    });
  };

  return (
    <Stack gap={2}>
      <Button
        variant="text"
        sx={{
          textTransform: "none",
          width: "fit-content",
          color: "var(--primary)",
          "&:hover": {
            color: "var(--primary)",
            backgroundColor: "white",
          },
        }}
        startIcon={<ArrowBackIosNewRoundedIcon />}
        onClick={() => setCheckoutState("billing")}
      >
        Billing details
      </Button>
      <Typography
        className={quicksand.className}
        variant="h2"
        fontSize={24}
        color={"var(--primary)"}
        fontWeight={600}
      >
        Order Summary
      </Typography>
      <Stack gap={2}>
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell className={quicksand.className}>
                  Products
                </StyledTableCell>
                <StyledTableCell className={quicksand.className}>
                  Quantity
                </StyledTableCell>
                <StyledTableCell className={quicksand.className} align="right">
                  Unit price
                </StyledTableCell>
                <StyledTableCell className={quicksand.className} align="right">
                  Subtotal
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.length === 0 && (
                <StyledTableRow>
                  <StyledTableCell colSpan={5} align="center">
                    Your cart is empty
                  </StyledTableCell>
                </StyledTableRow>
              )}
              {cart.map((row, index) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "14px",
                        fontWeight: "bold",
                        width: "40px",
                      }}
                    >
                      {row.count}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {Math.round(row.price - (row.price * row.discount) / 100)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {Math.round(
                      (row.price - (row.price * row.discount) / 100) * row.count
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack justifyContent={"flex-end"} direction={"row"} gap={5}>
          <Typography className={quicksand.className} fontWeight={"bold"}>
            Total:
          </Typography>
          <Typography
            className={quicksand.className}
            fontSize={20}
            fontWeight={"bold"}
          >
            ₹{" "}
            {cart.reduce(
              (acc, item) =>
                acc +
                Math.round(
                  (item.price - (item.price * item.discount) / 100) * item.count
                ),
              0
            )}
          </Typography>
        </Stack>
      </Stack>
      <Typography
        className={quicksand.className}
        fontWeight={"bold"}
        color={"var(--text-color-trinary)"}
      >
        As per 2018 supreme court order, online sale of firecrackers are not
        permitted! We value our customers and at the same time, respect
        jurisdiction. We request you to add your products to the cart and submit
        the required crackers through the place order button. We will contact
        you within 24 hrs and confirm the order through WhatsApp or phone call.
        Please add and submit your orders and enjoy your Diwali with Fast
        Crackers.
      </Typography>
      <Stack direction={"row"} justifyContent={"flex-end"}>
        <LoadingButton
          variant="contained"
          loading={loading}
          loadingPosition="start"
          disableElevation
          disabled={cart.length === 0}
          sx={{
            backgroundColor: "var(--primary)",
            width: "150px",
            "&:hover": {
              backgroundColor: "var(--primary)",
            },
            textTransform: "none",
          }}
          onClick={handlePlaceOrder}
        >
          Place Order
        </LoadingButton>
      </Stack>
    </Stack>
  );
}

function StepIndicator({ checkoutState }) {
  return (
    <Stack direction={"row"} width={"100%"}>
      <Typography
        width={"100%"}
        className={quicksand.className}
        fontSize={{
          xs: 12,
          sm: 16,
          md: 18,
        }}
        fontWeight={800}
        textAlign={"center"}
        sx={{
          backgroundColor: "var(--primary)",
          padding: "10px",
          color: "white",
        }}
      >
        Checkout Progress
      </Typography>
      <Typography
        width={"100%"}
        className={quicksand.className}
        fontSize={{
          xs: 12,
          sm: 16,
          md: 18,
        }}
        fontWeight={800}
        textAlign={"center"}
        sx={{
          border:
            checkoutState == "billing"
              ? "1px solid var(--secondary)"
              : "1px solid var(--border)",
          padding: "10px",
          color:
            checkoutState == "billing" ? "var(--secondary)" : "var(--border)",
          backgroundColor:
            checkoutState == "billing" ? "var(--category-color)" : "white",
        }}
      >
        Billing Details
      </Typography>
      <Typography
        width={"100%"}
        className={quicksand.className}
        fontSize={{
          xs: 12,
          sm: 16,
          md: 18,
        }}
        fontWeight={800}
        textAlign={"center"}
        sx={{
          border:
            checkoutState == "order"
              ? "1px solid var(--primary)"
              : "1px solid var(--border)",
          padding: "10px",
          color: checkoutState == "order" ? "var(--primary)" : "black",
          backgroundColor:
            checkoutState == "order" ? "var(--loading-color)" : "white",
        }}
      >
        Place Order
      </Typography>
    </Stack>
  );
}

function BillingDetails({
  handleClick,
  billingDetails,
  onBillingDetailsChange,
}) {
  // console.log(billingDetails);

  return (
    <Stack gap={5}>
      <Typography
        className={quicksand.className}
        variant="h2"
        fontSize={24}
        color={"var(--primary)"}
        fontWeight={600}
      >
        Contact Information
      </Typography>
      <Stack gap={2}>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          gap={2}
        >
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={billingDetails.name}
            sx={{
              width: {
                xs: "100%",
                sm: "350px",
              },
            }}
            onChange={onBillingDetailsChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={billingDetails.email}
            sx={{
              width: {
                xs: "100%",
                sm: "350px",
              },
            }}
            name="email"
            onChange={onBillingDetailsChange}
          />
        </Stack>
        <TextField
          label="Phone"
          variant="outlined"
          value={billingDetails.phone}
          sx={{
            width: {
              xs: "100%",
              sm: "350px",
            },
          }}
          name="phone"
          onChange={onBillingDetailsChange}
        />
      </Stack>
      <Typography
        className={quicksand.className}
        variant="h2"
        fontSize={24}
        color={"var(--primary)"}
        fontWeight={600}
      >
        Shipping Address
      </Typography>
      <Stack gap={2}>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          gap={2}
        >
          <TextField
            label="Address"
            variant="outlined"
            value={billingDetails.address}
            sx={{
              width: {
                xs: "100%",
                sm: "350px",
              },
            }}
            name="address"
            onChange={onBillingDetailsChange}
          />
          <TextField
            label="City"
            variant="outlined"
            value={billingDetails.city}
            sx={{
              width: {
                xs: "100%",
                sm: "350px",
              },
            }}
            name="city"
            onChange={onBillingDetailsChange}
          />
        </Stack>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          gap={2}
        >
          <TextField
            label="State"
            variant="outlined"
            value={billingDetails.state}
            sx={{
              width: {
                xs: "100%",
                sm: "350px",
              },
            }}
            name="state"
            onChange={onBillingDetailsChange}
          />
          <TextField
            label="Zip"
            variant="outlined"
            value={billingDetails.zip}
            sx={{
              width: {
                xs: "100%",
                sm: "350px",
              },
            }}
            name="zip"
            onChange={onBillingDetailsChange}
          />
        </Stack>
      </Stack>
      <Stack>
        <Button
          disableElevation
          variant="contained"
          sx={{
            backgroundColor: "var(--primary)",
            width: "150px",
            "&:hover": {
              backgroundColor: "var(--primary)",
            },
          }}
          onClick={handleClick}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  );
}
