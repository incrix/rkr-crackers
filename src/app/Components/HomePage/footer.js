"use client";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import logo from "@/public/Images/rkrLogo.png";
import green from "@/public/Images/green.png";
import iso from "@/public/Images/iso.png";
import Link from "next/link";
import { Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const handlePhoneCallOne = () => {
    window.location.href = "tel: 8838780610";
  };
  const handlePhoneCallTwo = () => {
    window.location.href = "tel: 9344746894";
  };
  const handlePhoneCallThree = () => {
    window.location.href = "tel: 8870973131 ";
  };

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/About" },
    { label: "Shop", href: "/Shop" },
    { label: "Contact Us", href: "/Contact" },
  ];

  // Updated category links based on ProductData.json
  const categoryLinks = [
    { label: "Flower Pots", href: "/Shop?category=Flower%20Pots#product" },
    { label: "Chakkar items", href: "/Shop?category=Chakkar%20items#product" },
    {
      label: "Single Shot Crackers",
      href: "/Shop?category=Single%20Shot%20Crackers#product",
    },
    { label: "Rockets", href: "/Shop?category=Rockets#product" },
    { label: "Multi Shots", href: "/Shop?category=Multi%20Shots#product" },
    { label: "Atom Bomb", href: "/Shop?category=Atom%20Bomb#product" },
    {
      label: "Colour Sparklers",
      href: "/Shop?category=Colour%20Sparklers#product",
    },
    { label: "New Arrivals", href: "/Shop?category=New%20Arrivals#product" },
  ];

  return (
    <Stack
      p={{ xs: 2, md: 4 }}
      px={{ xs: 2, md: 6 }}
      mt={{ xs: 5, md: 0 }}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack
        width={"100%"}
        gap={2}
        sx={{
          maxWidth: "1480px",
          margin: "0 auto",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          flexWrap={{ xs: "wrap", lg: "nowrap" }}
        >
          {/* Logo + About */}
          <Stack maxWidth={"300px"} gap={2}>
            <Stack direction="row" gap={1} alignItems="center">
              <Image
                src={logo.src}
                alt="RKR Fireworks Logo"
                width={80}
                height={80}
                priority
                style={{ width: "80px", height: "60px" }}
              />
              <Stack>
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  {/* RKR  */}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#686868",
                  }}
                >
                  {/* Fireworks & Crackers */}
                </span>
              </Stack>
            </Stack>

            <p>High quality fireworks manufacturer in TamilNadu</p>
            <Stack direction="row" gap={1} alignItems="center">
              <PersonIcon sx={{ color: "var(--secondary)" }} />
              <p>Aravindh Kumaraswamy</p>
            </Stack>
            <Stack direction="row" gap={1} alignItems="center">
              <MailIcon sx={{ color: "var(--secondary)" }} />
              <a
                href="mailto:rkrcrackers@gmail.com"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                rkrcrackers@gmail.com
              </a>
            </Stack>

            <Stack direction="row" gap={1} alignItems="flex-start">
              <PhoneIcon sx={{ color: "var(--secondary)", mt: "4px" }} />
              <Stack
                direction="row"
                flexWrap="wrap"
                columnGap={1}
                rowGap={0}
                alignItems="center"
              >
                {/* Grouping the first two numbers to keep them together */}
                <Stack
                  direction="row"
                  gap={1}
                  alignItems="center"
                  sx={{ whiteSpace: "nowrap" }}
                >
                  <p
                    onClick={handlePhoneCallOne}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    +91 88387 80610
                  </p>
                  <span>|</span>
                  <p
                    onClick={handlePhoneCallTwo}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    +91 93447 46894
                  </p>
                </Stack>

                {/* This separator only shows on medium screens and up */}
                <Typography
                  component="span"
                  sx={{ display: { xs: "none", md: "inline" } }}
                >
                  |
                </Typography>

                {/* The third number, which will wrap to the next line on xs screens */}
                <p
                  onClick={handlePhoneCallThree}
                  style={{
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  +91 88709 73131
                </p>
              </Stack>
            </Stack>
          </Stack>

          {/* Company Links */}
          <Stack gap={2} mt={{ xs: 6, md: 0 }}>
            <Typography
              sx={{
                color: "var(--text-color)",
                fontSize: { xs: "18px", md: "24px" },
                fontWeight: "600",
              }}
            >
              Company
            </Typography>

            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: isActive ? "var(--primary)" : "var(--text-color)",
                    textDecoration: "none",
                    fontWeight: isActive ? "600" : "400",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--text-color)";
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </Stack>

          {/* Categories */}
          <Stack gap={2} mt={{ xs: 6, md: 0 }}>
            <Typography
              sx={{
                color: "var(--text-color)",
                fontSize: { xs: "18px", md: "24px" },
                fontWeight: "600",
              }}
            >
              Categories
            </Typography>
            {categoryLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  color: "var(--text-color)",
                  textDecoration: "none",
                  transition: "all 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-color)";
                }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>

          {/* Certifications */}
          <Stack gap={2} mt={{ xs: 6, md: 0 }}>
            <Typography
              sx={{
                color: "var(--text-color)",
                fontSize: { xs: "18px", md: "24px" },
                fontWeight: "600",
              }}
            >
              Certified
            </Typography>
            <Image
              src={green.src}
              alt="Green Certification"
              width={100}
              height={100}
              style={{ width: "100%", height: "auto" }}
            />
            <Image
              src={iso.src}
              alt="ISO Certification"
              width={100}
              height={100}
              style={{ width: "100%", height: "auto" }}
            />
          </Stack>
        </Stack>

        <hr />

        {/* Bottom Bar */}
        <Stack
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "center", md: "center" }}
          spacing={{ xs: 2, md: 0 }}
          sx={{ textAlign: { xs: "center", md: "left" }, mt: 3 }}
        >
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()},{" "}
            <span
              onClick={() => router.push("/")}
              style={{
                color: "var(--primary)",
                fontWeight: "600",
                display: "inline",
                cursor: "pointer",
              }}
            >
              RKR Fireworks
            </span>
            <br />
            All rights reserved
          </p>

          <Stack>
            <p style={{ margin: 0 }}>
              Designed by{" "}
              <a
                href="https://incrix.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="https://incrix.com/logo.png"
                  alt="Incrix Logo"
                  width={120}
                  height={25}
                  style={{ width: "120px", height: "25px" }}
                />
              </a>
            </p>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
