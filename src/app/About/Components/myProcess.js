"use client";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";
import SparkOne from "@/public/Images/sparkOne.png";
import SparkTwo from "@/public/Images/sparkTwo.png";
import CircleIcon from "@mui/icons-material/Circle";
import { useRouter } from "next/navigation";

export default function MyProcess() {
  const router = useRouter();
  return (
    <Stack mt={{ xs: 5, md: 10 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={6}
        sx={{
          px: { xs: 2, md: 6 },
          py: { xs: 6, md: 10 },
        }}
      >
        {/* Left Side */}
        <Stack flex={1} spacing={3}>
          {/* Section Title */}
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              mb: 6,
              border: "1px solid var(--border-color)",
              width: "fit-content",
              px: 2,
              py: 1,
              borderRadius: 5,
              my: { xs: 4, md: 0 },
            }}
          >
            <CircleIcon
              sx={{
                fontSize: 20,
                mr: 1,
                color: "var(--secondary)",
              }}
            />
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ fontSize: { xs: "16px", md: "20px" } }}
            >
              MY PROCESS
            </Typography>
          </Stack>
          <Typography
            fontWeight="bold"
            sx={{
              lineHeight: 1.2,
              fontSize: { xs: "20px", md: "30px", lg: "75px" },
            }}
          >
            Our Sparkling
          </Typography>
          <Button
            disableElevation
            variant="contained"
            onClick={() => router.push("/Shop")}
            sx={{
              width: "fit-content",
              borderRadius: "12px",
              px: 3,
              backgroundColor: "var(--tertiary)",
              color: "white",
            }}
          >
            ↳ Order Now
          </Button>

          {/* Images Row */}
          <Stack
            alignItems={{ xs: "center", md: "flex-start" }}
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            mt={2}
          >
            <Image
              src={SparkOne.src}
              alt="Spark One"
              width={340}
              height={600}
              style={{ borderRadius: "8px", width: "100%" }}
            />
            <Image
              src={SparkTwo.src}
              alt="Spark Two"
              width={340}
              height={600}
              style={{ borderRadius: "8px", width: "100%" }}
            />
          </Stack>
        </Stack>

        {/* Right Side */}
        <Stack flex={1} spacing={3} pt={{ xs: 0, md: 15 }}>
          {[
            {
              title: "1. Selection",
              desc: "We handpick the safest, most vibrant crackers from certified manufacturers — ensuring quality for both retail & wholesale customers.",
            },
            {
              title: "2. Showcase",
              desc: "Our shelves and catalog are always stocked with a stunning variety of fireworks — from family-friendly sparklers to show-stopping aerial displays.",
            },
            {
              title: "3. Service",
              desc: "Whether you’re buying a single box or placing a bulk order, our team is ready to serve you with care, advice, and fast fulfillment.",
            },
            {
              title: "4. Celebrate",
              desc: "You light them up — we light up your smiles! Enjoy a dazzling celebration, knowing you got the best products at the right price & peace of mind.",
            },
          ].map((item, i) => (
            <Stack
              key={i}
              spacing={1}
              pb={2}
              sx={{ borderBottom: "1px solid #ccc" }}
            >
              <Typography
                fontWeight="bold"
                sx={{ fontSize: { xs: "16px", md: "20px", lg: "40px" } }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: "14px", md: "16px", lg: "21px" } }}
              >
                {item.desc}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
