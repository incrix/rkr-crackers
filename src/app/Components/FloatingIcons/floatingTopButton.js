"use client";
import Fab from "@mui/material/Fab";
import { GiFireworkRocket } from "react-icons/gi";

export default function FloatingTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    <Fab
      aria-label="scroll to top"
      onClick={scrollToTop}
      sx={{
        ...borderBeamStyle("#666666", "var(--tertiary)", "0s"),
        position: "fixed",
        bottom: 16,
        left: { xs: 18, md: 16 },
        zIndex: 1000,
      }}
    >
      <GiFireworkRocket style={{ fontSize: "2rem" }} />
    </Fab>
  );
}