"use client";
import Button from "@mui/material/Button";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

export function CallButton() {
  return (
    <Button
      variant="contained"
      onClick={() => {
        window.open("tel:+919360221102", "_self");
      }}
      sx={{
        backgroundColor: "var(--primary)",
        height: "50px",
        textTransform: "none",
        color: "white",
        "&:hover": {
          backgroundColor: "var(--primary)",
        },
      }}
      startIcon={<LocalPhoneRoundedIcon />}
    >
      Call now!
    </Button>
  );
}

export function WhatsappButton() {
  return (
    <Button
      variant="outlined"
      sx={{
        borderColor: "var(--primary)",
        height: "50px",
        textTransform: "none",
        color: "var(--primary)",
        "&:hover": {
          borderColor: "var(--primary)",
        },
      }}
      startIcon={<SendRoundedIcon />}
      onClick={() => {
        window.open(
          "https://wa.me/+919360221102?text=I'm%20interested%20in%20your%20products.",
          "_blank"
        );
      }}
    >
      Whatsapp
    </Button>
  );
}
