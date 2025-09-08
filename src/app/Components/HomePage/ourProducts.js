"use client";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ProductCard from "@/src/app/Shop/Components/productCard";
import { useRouter } from "next/navigation";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export default function OurProducts() {
  const [productList, setProductList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    fetch("https://e-com.incrix.com/RKR%20Crackers/productData.json")
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => a.sort_id - b.sort_id);

        // Group by category
        const grouped = data.reduce((acc, product) => {
          if (!acc[product.category]) acc[product.category] = [];
          acc[product.category].push(product);
          return acc;
        }, {});

        // Pick 2 products per category
        let selectedProducts = [];
        Object.keys(grouped).forEach((category) => {
          selectedProducts.push(...grouped[category].slice(0, 2));
        });

        // Limit to max 10 products
        setProductList(selectedProducts.slice(0, 12));
      });
  }, []);

  return (
    <Stack
      sx={{
        px: { xs: 0, md: 3 },
        mx: { xs: 2, md: 3 },
        mt: { xs: 5, md: 12 },
      }}
    >
      {/* Heading */}
      <Stack>
        <Typography
          color="var(--primary)"
          fontWeight="bold"
          textAlign="center"
          sx={{ fontSize: { xs: "20px", md: "30px" } }}
        >
          Our Products
        </Typography>
        <Typography
          sx={{ fontSize: { xs: "16px", md: "20px" } }}
          textAlign="center"
        >
          A vibrant selection of crackers designed for every festive mood.
        </Typography>
      </Stack>

      {/* Products Grid */}
      <Stack>
        <Grid container spacing={2} sx={{ mt: 4, justifyContent: "center" }}>
          {productList.map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        <Stack
          sx={{
            mt: 4,
            justifyContent: { xs: "center", md: "right" },
            alignItems: { xs: "center", md: "right" },
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            marginRight: { xs: "0", md: "85px" },
          }}
        >
          <Button
            endIcon={<KeyboardDoubleArrowRightIcon />}
            onClick={() => router.push("/Shop")}
            sx={{
              width: "180px",
              textTransform: "capitalize",
              borderRadius: "10px",
              fontSize: "16px",
              backgroundColor: "var(--primary)",
              color: "white",
              "&:hover": {
                backgroundColor: "var(--primary)",
              },
            }}
          >
            View All Products
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
