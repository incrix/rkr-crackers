"use client";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import aerial from "@/public/Images/aerial.png";
import chakkar from "@/public/Images/chakkar.png";
import flower from "@/public/Images/flower.png";
import rocket from "@/public/Images/rocket.png";
import sound from "@/public/Images/sound.png";
import special from "@/public/Images/special.png";
import bomb from "@/public/Images/bomb.png";
import twinkle from "@/public/Images/twinkle.png"; // Added twinkle icon import
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useProducts } from "@/src/app/context/ProductContext";

const CatButton = ({ title, img, count, link }) => {
  const router = useRouter();
  return (
    <Stack
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        border: "1px solid",
        borderColor: "var(--border)",
        borderRadius: "5px",
        height: "50px",
        padding: "0 20px",
        color: "white",
        backgroundColor: "var(--primary)",
        "&:hover": {
          backgroundColor: "var(--primary)",
          cursor: "pointer",
          opacity: 0.9,
        },
      }}
      onClick={() => {
        router.push(`/Shop?category=${link}#product`);
      }}
    >
      <Image
        src={img}
        alt={title}
        width={30}
        height={30}
        style={{ objectFit: "contain" }}
      />
      <p style={{ fontSize: "14px", fontWeight: "600" }}>{title}</p>
      <Stack
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: "var(--secondary)",
          color: "white",
        }}
      >
        {count}
      </Stack>
    </Stack>
  );
};

export default function HeroCategory() {
  const { productList = [], loading } = useProducts();

  // Dynamic category list based on new product data
  const categories = [
    { title: "Single Shot Crackers", img: sound },
    { title: "Chakkar items", img: chakkar },
    { title: "Flower Pots", img: flower },
    { title: "Candles & Twinkling Star", img: twinkle },
    { title: "Atom Bomb", img: bomb },
    { title: "Kids Crackers", img: special },
    { title: "Rockets", img: rocket },
    { title: "Fancy Novelties", img: special },
    { title: "Fancy Fountains", img: flower },
    { title: "Multi Shots", img: aerial },
    { title: "Colour Sparklers", img: twinkle },
    { title: "New Arrivals", img: special },
    { title: "Adiyal/Paper Bomb", img: bomb },
    { title: "Crackers", img: sound },
    { title: "Deluxe Crackers", img: sound },
    { title: "Matches", img: special },
  ];

  if (loading) return <p>Loading categories...</p>;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        width: "100%",
        minWidth: "300px",
        maxWidth: "600px",
        border: "2px solid",
        borderColor: "#ECECEC",
        borderRadius: "15px",
        position: "sticky",
        top: "80px",
      }}
    >
      <Stack top={0}>
        <h6
          style={{
            paddingBottom: "10px",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Category
        </h6>
        <hr
          style={{
            width: "100%",
            height: "2px",
            backgroundColor: "#ECECEC",
            border: "none",
            marginBottom: "20px",
          }}
        />
        <Stack gap={2.5}>
          {categories.map((cat) => (
            <CatButton
              key={cat.title}
              title={cat.title}
              img={cat.img}
              link={encodeURIComponent(cat.title)}
              count={
                productList.filter((product) => product.category === cat.title)
                  .length
              }
            />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
}
