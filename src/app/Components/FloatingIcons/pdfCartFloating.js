"use client";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/navigation";
import Badge from "@mui/material/Badge";
import { useState, useEffect } from "react";

export default function PdfCartFloating() {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(1);
  useEffect(() => {
    setCartCount(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart")).length
        : 0
    );
    setInterval(() => {
      setCartCount(
        localStorage.getItem("cart")
          ? JSON.parse(localStorage.getItem("cart")).length
          : 0
      );
    }, 500);
  }, []);

  const handlePdfDownload = async () => {
    const pdfUrl = "https://e-com.incrix.com/RKR%20Crackers/RKR_Pricelist.pdf";
    const fileName = "RKR_Pricelist.pdf";

    try {
      // Open PDF in a new tab
      window.open(pdfUrl, "_blank");

      // Fetch the PDF to trigger download
      const response = await fetch(pdfUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch the PDF");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // Trigger download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert(
        "Failed to download the PDF. Please try downloading it manually from the opened tab."
      );
    }
  };

  // 🔥 Glow + Floating style
  const borderBeamStyle = (glowColor, bgColor, delay = "0s") => ({
    boxShadow: `0 0 8px ${glowColor}, 0 0 16px ${glowColor}`,
    color: "white",
    position: "relative",
    overflow: "hidden",
    backgroundColor: bgColor,
    transition: "opacity 0.3s ease",
    animation: `float 2.5s ease-in-out infinite ${delay}`,
    "&::before": {
      content: '""',
      position: "absolute",
      inset: -2,
      borderRadius: "50%",
      padding: "2px",
      background: `conic-gradient(from 0deg, ${glowColor} 0%, transparent 80%)`,
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      animation: "rotate 2s linear infinite",
    },
    "&:hover": {
      opacity: 0.9,
      backgroundColor: bgColor,
    },
    "@keyframes rotate": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
    "@keyframes float": {
      "0%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-8px)" },
      "100%": { transform: "translateY(0)" },
    },
  });

  return (
    <Stack
      spacing={2}
      sx={{
        position: "fixed",
        bottom: 16,
        right: { xs: 18, md: 16 },
        zIndex: 1000,
      }}
    >
      {/* PDF Button */}
      <Fab
        aria-label="pdf"
        onClick={handlePdfDownload}
        sx={borderBeamStyle("#d1a300", "var(--secondary)", "0s")} // 🔴 red glow
      >
        <PictureAsPdfIcon />
      </Fab>

      {/* Cart Button */}
      <Fab
        aria-label="cart"
        onClick={() => router.push("/Cart")}
        sx={borderBeamStyle("#c21834", "var(--primary)", "0.3s")}
      >
        <Badge
          badgeContent={cartCount}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "var(--secondary)",
              color: "#fff",
            },
          }}
        >
          <ShoppingCartIcon />
        </Badge>
      </Fab>
    </Stack>
  );
}
