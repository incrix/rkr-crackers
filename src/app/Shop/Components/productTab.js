"use client";
import Stack from "@mui/material/Stack";
import ProductCard from "@/src/app/Shop/Components/productCard";
import { useEffect, useState } from "react";

export default function ProductTab({ category }) {
  const [productList, setProductList] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState([]);

  // 🔹 1. Fetch data only once
  useEffect(() => {
    fetch("https://e-com.incrix.com/RKR%20Crackers/productData.json")
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => a.sort_id - b.sort_id);
        localStorage.setItem("productList", JSON.stringify(data));
        setProductList(data);
      });
  }, []); // ✅ only runs once

  // 🔹 2. Filter when category OR productList changes
  useEffect(() => {
    if (category) {
      setFilteredProductList(
        productList.filter((product) =>
          category === "Atom bombs"
            ? product.category === "Atom bombs" ||
              product.category === "Bijili crackers"
            : category === "Twinklers"
            ? product.category === "Twinkling stars" ||
              product.category === "Pencils"
            : product.category === category
        )
      );
    } else {
      setFilteredProductList(productList);
    }
  }, [category, productList]); // ✅ correct dependencies

  return (
    <Stack
      margin={{
        xs: "40px 0 0 0",
        sm: "20px",
        md: "20px 0 0 0",
      }}
      width={"100%"}
    >
      <h4
        id="product"
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginLeft: "10px",
        }}
      >
        {category
          ? category === "Atom bombs"
            ? "Atom bombs & Bijili"
            : category
          : "Our Products"}
      </h4>
      <Stack
        width={"100%"}
        padding={"40px 0 0 0"}
        display={"flex"}
        direction={"row"}
        flexWrap={"wrap"}
        gap={2}
        justifyContent={{
          xs: "center",
          sm: "center",
          md: "center",
          lg: "center",
        }}
      >
        {filteredProductList.length > 0 &&
          filteredProductList.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </Stack>
    </Stack>
  );
}
