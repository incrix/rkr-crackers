"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Image from "next/image";
import fourImagePic from "@/public/Images/fourPicGrid.png";

export default function AboutUs() {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={4}
      sx={{
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 5 },
        alignItems: "center",
      }}
    >
      {/* Left Section - 60% */}
      <Stack flex={{ xs: 1, md: 0.6 }} spacing={3}>
        <Stack
          sx={{
            alignSelf: "flex-start",
            borderRadius: "20px",
            textTransform: "none",
            px: 2,
            border: "1px solid var(--border)",
            py: 1,
          }}
        >
          About us
        </Stack>

        <Typography variant="h4" fontWeight="bold">
          Discover our sparkling Journey
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Welcome to RKR Crackers — where every celebration comes alive! We’re
          dedicated to delivering vibrant, safe, and unforgettable fireworks for
          families, friends, and grand occasions.
        </Typography>

        <Typography variant="body1" color="text.secondary">
          With years of experience in both retail and wholesale, RKR Crackers
          has become the name people trust to light up the skies — and their
          hearts. Our mission? To make every Diwali, wedding, and celebration
          truly thunder with color, joy, and sparkle. Let’s celebrate louder,
          brighter, and safer — together.
        </Typography>

        {/* Email + Subscribe */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            mt: 2,
            border: "1px solid var(--primary)",
            borderRadius: "25px",
            p: 1,
            alignItems: "center", // ensures TextField content centers vertically
          }}
        >
          <TextField
            placeholder="Enter your email"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                "&::placeholder": {
                  color: "gray",
                  opacity: 1,
                },
              },
            }}
            sx={{
              flex: 1,
              px: 1,
              "& input": {
                height: "40px", // keeps input height
                padding: "0 8px", // aligns placeholder left center
              },
            }}
          />
          <Button
            disableElevation
            variant="contained"
            sx={{
              borderRadius: "20px",
              px: 3,
              backgroundColor: "var(--primary)",
              textTransform: "none",
              height: "40px",
            }}
          >
            Subscribe
          </Button>
        </Stack>
      </Stack>

      {/* Right Section - 40% */}
      <Stack flex={{ xs: 1, md: 0.4 }} alignItems="center">
        <Image
          width={100}
          height={100}
          src={fourImagePic.src}
          alt="About Us Images"
          style={{ width: "100%", height: "auto", borderRadius: "12px" }}
        />
      </Stack>
    </Stack>
  );
}
