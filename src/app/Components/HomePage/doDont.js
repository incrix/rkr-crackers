"use client";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  Store,
  SupervisedUserCircle,
  CleaningServices,
  Opacity,
  Whatshot,
  MenuBook,
  Science,
  Group,
  LocalFireDepartment,
  Checkroom,
  Pets,
  WineBar,
} from "@mui/icons-material";
import Image from "next/image";
import DoThumbsUp from "@/public/Images/leftThumbUp.png";
import DontThumbsDown from "@/public/Images/rightThumbDown.png";

export default function DoDont() {
  return (
    <Stack
      sx={{
        px: { xs: 0, md: 3 },
        mx: { xs: 2, md: 3 },
        mt: { xs: 2, md: 12 },
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 4, md: 8 }} // Increased spacing for more gap between columns
        sx={{
          px: { xs: 2, md: 6 },
          py: { xs: 4, md: 6 },
          bgcolor: "var(--primary)",
          borderRadius: 3,
          position: "relative",
          overflow: "visible",
        }}
      >
        {/* ✅ Do's Section */}
        <Stack flex={1} sx={{ position: "relative" }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              position: "absolute",
              top: 10,
              left: "50%",
              transform: "translateX(-50%)",
              bgcolor: "var(--secondary)",
              px: 2,
              py: 1.5,
              borderRadius: 2,
              color: "white",
              zIndex: 1,
              width: "200px",
              height: "70px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={DoThumbsUp.src}
              alt="Do Thumbs Up"
              width={50}
              height={50}
              style={{ width: "50px", height: "50px" }}
            />
            <Typography variant="h4" fontWeight={700}>
              Do’s
            </Typography>
          </Stack>

          <Stack
            spacing={4} // Increased from 2 to 4 for larger vertical gaps
            sx={{
              bgcolor: "white",
              p: 3,
              borderRadius: 3,
              mt: 4,
              pt: 10,
              height: { xs: "100%", md: "auto", lg: "630px" },
              lineHeight: 1.5,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Store
                sx={{ color: "var(--secondary)", fontSize: { xs: 12, md: 18,lg:24 } }}
              />
              <Typography fontSize={{ xs: 12, md: 24 }}>
                Purchase Fireworks from Licensed merchants.
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <SupervisedUserCircle
                sx={{ color: "var(--secondary)", fontSize: { xs: 12, md: 18,lg:24 } }}
              />
              <Typography fontSize={{ xs: 12, md: 24 }}>
                Have a responsible adult in charge.
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <CleaningServices
                sx={{ color: "var(--secondary)", fontSize: { xs: 12, md: 18,lg:24 } }}
              />
              <Typography fontSize={{ xs: 12, md: 24 }}>
                Prepare a safe, outdoor environment clear of dried wood, grass
                and buildings.
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Opacity
                sx={{ color: "var(--secondary)", fontSize: { xs: 12, md: 18,lg:24 } }}
              />
              <Typography fontSize={{ xs: 12, md: 24 }}>
                Have water (hose, bucket or pump) readily available in case of
                fire.
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Whatshot
                sx={{ color: "var(--secondary)", fontSize: { xs: 12, md: 18,lg:24 } }}
              />
              <Typography fontSize={{ xs: 12, md: 24 }}>
                Light fireworks one at a time and away from your body.
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <MenuBook
                sx={{ color: "var(--secondary)", fontSize: { xs: 12, md: 18,lg:24 } }}
              />
              <Typography fontSize={{ xs: 12, md: 24 }}>
                Display fireworks as per the warnings and instructions on the
                pack.
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* ❌ Don’ts Section */}
        <Stack flex={1} sx={{ position: "relative" }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              position: "absolute",
              top: 10,
              left: "50%",
              transform: "translateX(-50%)",
              bgcolor: "var(--secondary)",
              px: 2,
              py: 1.5,
              borderRadius: 2,
              color: "white",
              zIndex: 1,
              width: "200px",
              height: "70px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" fontWeight={700}>
              Don’ts
            </Typography>
            <Image
              src={DontThumbsDown.src}
              alt="Dont Thumbs Down"
              width={50}
              height={50}
              style={{ width: "50px", height: "50px" }}
            />
          </Stack>

          <Stack
            spacing={4} // Increased from 2 to 4 for larger vertical gaps
            sx={{
              bgcolor: "white",
              p: 3,
              borderRadius: 3,
              mt: 4,
              pt: 12,
              height: { xs: "100%", md: "auto", lg: "630px" },
              lineHeight: 1.5,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Science
                sx={{ color: "var(--secondary)", fontSize: { xs: 12, md: 18,lg:24 } }}
              />
              <Typography fontSize={{ xs: 12, md: 24 }}>
                Never discharge illegal fireworks.
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Group
                sx={{ color: "var(--secondary)", fontSize: { xs: 12, md: 18,lg:24 } }}
              />
              <Typography fontSize={{ xs: 12, md: 24 }}>
                Never give fireworks to children.
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <LocalFireDepartment
                sx={{ color: "var(--secondary)", fontSize: { xs: 12, md: 18,lg:24 } }}
              />
              <Typography fontSize={{ xs: 12, md: 24 }}>
                Never try to extinguish live fireworks that are on fire.
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Checkroom
                sx={{ color: "var(--secondary)", fontSize: { xs: 12, md: 18,lg:   24 } }}
              />
              <Typography fontSize={{ xs: 12, md: 24 }}>
                Never carry fireworks in your pocket.
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Pets
                sx={{ color: "var(--secondary)", fontSize: { xs: 12, md: 18,lg:24 } }}
              />
              <Typography fontSize={{ xs: 12, md: 24 }}>
                Do not point fireworks on people or animals.
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <WineBar
                sx={{ color: "var(--secondary)", fontSize: { xs: 12, md: 18,lg:24 } }}
              />
              <Typography fontSize={{ xs: 12, md: 24 }}>
                Never use metal or glass containers to launch fireworks.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
