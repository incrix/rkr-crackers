"use client";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import aerial from "@/public/Images/aerial.png";
import chakkar from "@/public/Images/chakkar.png";
import flower from "@/public/Images/flower.png";
import rocket from "@/public/Images/rocket.png";
import sound from "@/public/Images/sound.png";
import special from "@/public/Images/special.png";
import bomb from "@/public/Images/bomb.png";
import all from "@/public/Images/all.png";
import twinkle from "@/public/Images/twinkle.png";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

export default function ShopByCategory() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  useEffect(() => {
    // console.log(category);
  }, [category]);
  const catList = [
    {
      id: 0,
      title: "All Categories",
      imgURL: all.src,
    },
    {
      id: 1,
      title: "Single Shot Crackers",
      imgURL: sound.src,
      url: "Single%20Shot%20Crackers",
      query: "Single Shot Crackers",
    },
    {
      id: 2,
      title: "Chakkar items",
      imgURL: chakkar.src,
      url: "Chakkar%20items",
      query: "Chakkar items",
    },
    {
      id: 3,
      title: "Flower Pots",
      imgURL: flower.src,
      url: "Flower%20Pots",
      query: "Flower Pots",
    },
    {
      id: 4,
      title: "Candles & Twinkling Star",
      imgURL: twinkle.src,
      url: "Candles",
      query: "Candles & Twinkling Star",
    },
    {
      id: 5,
      title: "Atom Bomb",
      imgURL: bomb.src,
      url: "Atom%20Bomb",
      query: "Atom Bomb",
    },
    {
      id: 6,
      title: "Kids Crackers",
      imgURL: special.src,
      url: "Kids%20Crackers",
      query: "Kids Crackers",
    },
    {
      id: 7,
      title: "Rockets",
      imgURL: rocket.src,
      url: "Rockets",
      query: "Rockets",
    },
    {
      id: 8,
      title: "Fancy Novelties",
      imgURL: special.src,
      url: "Fancy%20Novelties",
      query: "Fancy Novelties",
    },
    {
      id: 9,
      title: "Fancy Fountains",
      imgURL: flower.src,
      url: "Fancy%20Fountains",
      query: "Fancy Fountains",
    },
    {
      id: 10,
      title: "Multi Shots",
      imgURL: aerial.src,
      url: "Multi%20Shots",
      query: "Multi Shots",
    },
    {
      id: 11,
      title: "Colour Sparklers",
      imgURL: twinkle.src,
      url: "Colour%20Sparklers",
      query: "Colour Sparklers",
    },
    {
      id: 12,
      title: "New Arrivals",
      imgURL: special.src,
      url: "New%20Arrivals",
      query: "New Arrivals",
    },
    {
      id: 13,
      title: "Adiyal/Paper Bomb",
      imgURL: bomb.src,
      url: "Adiyal%2FPaper%20Bomb",
      query: "Adiyal/Paper Bomb",
    },
    {
      id: 14,
      title: "Crackers",
      imgURL: sound.src,
      url: "Crackers",
      query: "Crackers",
    },
    {
      id: 15,
      title: "Deluxe Crackers",
      imgURL: sound.src,
      url: "Deluxe%20Crackers",
      query: "Deluxe Crackers",
    },
    {
      id: 16,
      title: "Matches",
      imgURL: special.src,
      url: "Matches",
      query: "Matches",
    },
  ];

  return (
    <Stack width={"100%"} gap={4}>
      <Stack width={"100%"} flexDirection={"row"} gap={2} alignItems={"center"}>
        <Typography
          variant="h4"
          sx={{
            fontSize: {
              xs: "20px",
              sm: "32px",
              md: "32px",
              lg: "32px",
              xl: "32px",
            },
            color: "var(--text-color)",
            fontWeight: "bold",
          }}
        >
          Shop By Categories
        </Typography>
        <Link href={"/Shop"}>
          <span
            style={{
              fontSize: "16px",
              color: "var(--secondary)",
              fontWeight: "bold",
            }}
          >
            All Categories
          </span>
        </Link>
      </Stack>
      <Stack
        flexWrap={{
          xs: "wrap",
          sm: "nowrap",
        }}
        justifyContent={{
          xs: "center",
          sm: "center",
        }}
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: {
            xs: "20px",
            sm: "20px",
          },
          padding: "10px 0 20px 0",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {catList.map((cat, index) => {
          return (
            <CatCard
              key={index}
              title={cat.title}
              imgURL={cat.imgURL}
              url={cat.url}
              isSelected={category === cat.query}
            />
          );
        })}
      </Stack>
    </Stack>
  );
}

const CatCard = ({ title, imgURL, url, isSelected }) => {
  const router = useRouter();

  return (
    <Paper
      sx={{
        background: isSelected ? "#F4F6FA" : "white",
        width: {
          xs: "140px",
          sm: "150px",
          md: "140px",
        },
        height: {
          xs: "150px",
          sm: "180px",
          md: "160px",
        },
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
        backgroundColor: "var(--primary)",
        color: "white",
      }}
      onClick={() => {
        !url
          ? router.push("/Shop#product")
          : router.push("/Shop?category=" + url + "#product");
      }}
    >
      <Image
        src={imgURL}
        alt={title}
        width={80}
        height={80}
        style={{
          margin: "0 35px",
        }}
      />
      <p
        style={{
          textAlign: "center",
          width: "100px",
          fontSize: "14px",
          fontWeight: "bold",
          color: "var(--text-color)",
        }}
      >
        {title}
      </p>
    </Paper>
  );
};
