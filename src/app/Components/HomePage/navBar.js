"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "@/public/Images/rkrLogo.png";
import CustomButton from "@/src/app/Ui/Button/Button";
import { useRouter, usePathname } from "next/navigation";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/About" },
  { label: "Shop", href: "/Shop" },
];

export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartCount, setCartCount] = useState(1);
  const router = useRouter();
  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const pathname = usePathname();

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

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "#fff",
        px: { xs: 2, md: 6 },
        py: 1.5,
        height: { xs: 70, md: 80 },
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* ---------- LEFT (Logo + Links on Desktop) ---------- */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: { md: 6, xs: 0 } }}
        >
          {/* Logo */}
          <Image
            onClick={() => router.push("/")}
            src={Logo.src}
            alt="Ponnus"
            width={50}
            height={50}
            style={{ cursor: "pointer", width: "60px", height: "50px" }}
          />

          {/* Desktop Nav Links */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" }, // hide on mobile
              alignItems: "center",
              gap: 8,
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  textDecoration: pathname === link.href ? "underline" : "none",
                  color: pathname === link.href ? "var(--primary)" : "#000",
                  fontFamily: "var(--font-secondary)",
                  fontWeight: pathname === link.href ? "bold" : "normal",
                  fontSize: "18px",
                }}
              >
                {link.label}
              </Link>
            ))}
          </Box>
        </Box>

        {/* ---------- RIGHT (Cart + Contact on Desktop) ---------- */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Cart Button with Badge */}
          <IconButton
            color="inherit"
            onClick={() => router.push("/Cart")}
            sx={{
              color: "var(--secondary)",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
            <Typography
              variant="body2"
              sx={{ fontSize: "16px", color: "#000" }}
            >
              Cart
            </Typography>
          </IconButton>

          {/* Contact Button */}
          <Button
            endIcon={<PhoneInTalkIcon />}
            variant="contained"
            onClick={() => {
              router.push("/Contact");
            }}
            sx={{
              backgroundColor: "var(--secondary)",
              color: "#fff",
              borderRadius: "10px",
              textTransform: "none",
              "&:hover": { backgroundColor: "var(--secondary)" },
            }}
            disableElevation
          >
            Contact Us
          </Button>
        </Box>

        {/* ---------- MOBILE: Hamburger Icon ---------- */}
        <IconButton
          edge="end"
          color="inherit"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: "flex", md: "none" }, color: "#000" }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* ---------- MOBILE: Drawer Menu ---------- */}
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: "100vw",
            height: "100vh",
            backgroundColor: "#fff",
            px: 2,
            pt: 3,
            position: "relative",
          },
        }}
      >
        {/* Close Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ color: "#000", backgroundColor: "grey", p: "5px" }}
          >
            <CloseIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </Box>

        {/* Drawer Nav Links */}
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                component={Link}
                href={link.href}
                onClick={toggleDrawer(false)}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    fontFamily: "var(--font-secondary)",
                    fontSize: "1rem",
                    color: pathname === link.href ? "var(--primary)" : "black",
                    textDecoration:
                      pathname === link.href ? "underline" : "none",
                    fontWeight: pathname === link.href ? "bold" : "normal",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}

          {/* 🔹 Cart Button ABOVE Contact in mobile */}
          <Box sx={{ mt: 3 }}>
            <IconButton
              color="inherit"
              onClick={() => {
                router.push("/Cart");
                setDrawerOpen(false);
              }}
              sx={{
                color: "var(--secondary)",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon fontSize="large" />
              </Badge>
              <Typography sx={{ fontSize: "18px", color: "#000" }}>
                Cart
              </Typography>
            </IconButton>
          </Box>

          {/* Contact Button */}
          <Box sx={{ mt: 2 }}>
            <CustomButton
              endIcon={<PhoneInTalkIcon />}
              sx={{
                backgroundColor: "var(--secondary)",
                color: "#fff",
                borderRadius: "10px",
                textTransform: "none",
                "&:hover": { backgroundColor: "var(--secondary)" },
              }}
              onClick={() => {
                router.push("/Contact");
                setDrawerOpen(false);
              }}
            >
              Contact Us
            </CustomButton>
          </Box>
        </List>
      </Drawer>
    </AppBar>
  );
}
