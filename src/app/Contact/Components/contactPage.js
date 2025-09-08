"use client";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { CallButton, WhatsappButton } from "./clientComp";
import ContactPng from "@/public/Images/contactImage.png";
import { Quicksand } from "next/font/google";
const quicksand = Quicksand({ subsets: ["latin"] });
import Image from "next/image";
import { useState } from "react";

export default function ContactPage() {
  return (
    <Stack
      sx={{
        px: { xs: 0, md: 3 },
        mx: { xs: 2, md: 3 },
        mt: { xs: 12, md: 12 },
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          padding: { xs: "0px 10px", md: "0px 40px" },
        }}
      >
        <Stack
          sx={{
            width: "100%",
            maxWidth: "100%",
            padding: "40px 0",
            gap: 20,
          }}
        >
          <AddressComponent />
          <ContactForm />
        </Stack>
      </Stack>
    </Stack>
  );
}

function AddressComponent() {
  const handlePhoneCallOne = () => {
    window.location.href = "tel: 8838780610";
  };
  const handlePhoneCallTwo = () => {
    window.location.href = "tel: 9344746894";
  };
  const handlePhoneCallThree = () => {
    window.location.href = "tel: 8870973131";
  };
  return (
    <Stack
      direction={{
        sm: "column",
        md: "row",
      }}
      gap={10}
    >
      <Stack
        width={{
          sm: "100%",
          md: "50%",
        }}
        gap={10}
      >
        <Typography
          className={quicksand.className}
          variant="h1"
          fontSize={40}
          fontWeight={800}
        >
          Contact Us
        </Typography>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          gap={2}
          justifyContent={"space-between"}
        >
          <Stack gap={2}>
            <Typography
              className={quicksand.className}
              variant="h2"
              fontSize={24}
              color={"var(--primary)"}
              fontWeight={600}
            >
              Office
            </Typography>
            <Typography
              className={quicksand.className}
              fontSize={20}
              fontWeight={400}
            >
              3/348-16/3, <br />
              Sivakasi- Alagankulam main road,  <br />
              Maraneri, Sivakasi, <br />
              Tamil Nadu 626124
            </Typography>
            <Typography
              className={quicksand.className}
              fontSize={20}
              fontWeight={400}
            >
              Email:{" "}
              <span style={{ cursor: "pointer" }}>
                rkrcrackers@gmail.com
              </span>
            </Typography>
            <Typography
              className={quicksand.className}
              fontSize={20}
              fontWeight={400}
            >
              Ph:{" "}
              <span style={{ cursor: "pointer" }} onClick={handlePhoneCallOne}>
                +91 88387 80610
              </span>{" "}
              <br />
              &nbsp;&ensp;&emsp;
              <span style={{ cursor: "pointer" }} onClick={handlePhoneCallTwo}>
                +91 93447 46894
              </span>
              <br />
              &nbsp;&ensp;&emsp;
              <span style={{ cursor: "pointer" }} onClick={handlePhoneCallThree}>
                +91 88709 73131
              </span>
            </Typography>
          </Stack>
          {/* <Stack gap={2}>
            <Typography
              className={quicksand.className}
              variant="h2"
              fontSize={24}
              color={"var(--primary)"}
              fontWeight={600}
            >
              Factory
            </Typography>
            <Typography
              className={quicksand.className}
              fontSize={20}
              fontWeight={400}
            >
              9/241, <br />
              Kanmaisurangudi Village, <br />
              Sattur-626203.
            </Typography>
            <Typography
              className={quicksand.className}
              fontSize={20}
              fontWeight={400}
            >
              Ph: +91 99620 66648 <br />
              &nbsp;&ensp;&emsp;+91 84892 92901
            </Typography>
          </Stack> */}
        </Stack>
        <Stack gap={2}>
          <CallButton />
          <WhatsappButton />
        </Stack>
      </Stack>
      <Stack
        width={{
          sm: "100%",
          md: "50%",
        }}
        height={{
          xs: "400px",
          sm: "400px",
          md: "500px",
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62973.92629246436!2d77.71391169909205!3d9.432765205139393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cf5b1f121b59%3A0x6fa7c65a3d16bc19!2sMaraneri%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1757311504009!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </Stack>
    </Stack>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // const handleSubmit = async () => {
  //   if (!formData.name || !formData.email || !formData.message) {
  //     alert("Please fill required fields");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const res = await fetch("https://sriramdiecastings.com/send-mail.php", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });

  //     const text = await res.text();

  //     if (res.ok) {
  //       alert("Message sent successfully!");
  //       setFormData({
  //         name: "",
  //         email: "",
  //         phone: "",
  //         company: "",
  //         message: "",
  //       });
  //     } else {
  //       alert(`Error: ${text || "Failed to send"}`);
  //     }
  //   } catch (err) {
  //     alert("Network error. Please try again later.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <Stack
      direction={{
        sm: "column",
        md: "row",
      }}
      gap={5}
    >
      <Stack
        gap={5}
        width={{
          sm: "100%",
          md: "60%",
        }}
      >
        <Stack>
          <Typography
            className={quicksand.className}
            fontSize={20}
            color={"var(--primary)"}
            fontWeight={800}
          >
            Wholesalers Contact form
          </Typography>
          <Typography
            className={quicksand.className}
            fontWeight={800}
            fontSize={40}
          >
            Drop Us a Line
          </Typography>
          <Typography
            className={quicksand.className}
            color={"#B6B6B6"}
            fontSize={14}
          >
            Your email address will not be published.
          </Typography>
        </Stack>
        <Stack gap={2}>
          <Stack direction={"row"} gap={2}>
              <TextField
              type="text"
              fullWidth
              placeholder="Name"
              value={formData.name}
              onChange={handleChange("name")}
            />
            <TextField
              type="email"
              placeholder="Email"
              fullWidth
              value={formData.email}
              onChange={handleChange("email")}
            />
          </Stack>
          <Stack direction={"row"} gap={2}>
            <TextField
              type="text"
              placeholder="Phone"
              fullWidth
              value={formData.phone}
              onChange={handleChange("phone")}
            />
            <TextField
              type="text"
              placeholder="Company"
              fullWidth
              value={formData.company}
              onChange={handleChange("company")}
            />
          </Stack>
          <TextField
            placeholder="Message"
            multiline
            inputProps={{ style: { resize: "vertical" } }}
            value={formData.message}
            onChange={handleChange("message")}
          />
          <Button
            // disabled={loading}
            // onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: "var(--primary)",
              height: "50px",
              textTransform: "none",
              color: "white",
              "&:hover": {
                backgroundColor: "var(--primary)",
              },
            }}
          >
            Send Message
          </Button>
        </Stack>
      </Stack>
      <Stack
        width={{
          sm: "100%",
          md: "40%",
        }}
      >
        <Image
          width={100}
          height={100}
          src={ContactPng.src}
          alt="Contact illustration" // meaningful alt text
          style={{ width: "100%", height: "auto" }}
        />
      </Stack>
    </Stack>
  );
}
