"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import HeroCategory from "@/src/app/Shop/Components/heroCategory";
import { Quicksand } from "next/font/google";
const quicksand = Quicksand({ subsets: ["latin"] });
import ProductCard from "@/src/app/Shop/Components/productCard";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import NavBar from "@/src/app/Components/HomePage/navBar";
import Footer from "@/src/app/Components/HomePage/footer";
import Image from "next/image";
import { useProducts } from "@/src/app/context/ProductContext";
import PdfCartFloating from "@/src/app/Components/FloatingIcons/pdfCartFloating";

export default function ProductPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  const router = useRouter();
  const { productList, loading } = useProducts();
  const [product, setProduct] = useState(null);
  const [itemCount, setItemCount] = useState(1);

  useEffect(() => {
    if (!loading && productList.length > 0) {
      const found = productList.find((p) => p.id == search);
      setProduct(found || null);
    }
  }, [search, productList, loading]);

  if (loading) {
    return (
      <Stack sx={{ mt: 20, textAlign: "center" }}>
        <Typography variant="h6">Loading product...</Typography>
      </Stack>
    );
  }

  return (
    <Stack>
      <NavBar />
      <Stack
        sx={{
          px: { xs: 0, md: 3 },
          mx: { xs: 2, md: 3 },
          mt: { xs: 12, md: 12 },
        }}
      >
        <Stack
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Stack
            width={"100%"}
            maxWidth={"var(--max-width)"}
            padding={{
              xs: "20px",
              sm: "40px",
              md: "40px",
              lg: "40px",
              xl: "40px 0",
            }}
          >
            <Button
              size="small"
              sx={{
                width: "50px",
                color: "var(--primary)",
                fontWeight: "bold",
                mb: "20px",
                textTransform: "none",
              }}
              onClick={() => router.push("/Shop")}
              startIcon={<ArrowBackIosNewRoundedIcon />}
            >
              Back
            </Button>
            {product && (
              <Stack
                direction={{
                  sm: "column",
                  md: "row",
                }}
                gap={{
                  sm: 2,
                  md: 10,
                }}
                justifyContent={"space-between"}
              >
                <Stack
                  width={{
                    sm: "100%",
                    md: 700,
                    lg: 700,
                    xl: 1000,
                  }}
                >
                  <Carousel
                    showArrows={true}
                    useKeyboardArrows={true}
                    interval={5000}
                    dynamicHeight={true}
                    stopOnHover={true}
                    infiniteLoop={true}
                    // showStatus={true}
                    transitionTime={500}
                    showThumbs={true}
                    showIndicators={true}
                    emulateTouch={true}
                    autoPlay={true}
                    renderThumbs={(children) =>
                      children.map((item) => {
                        return (
                          <Image
                            key={item}
                            src={item.props.children.props.src}
                            alt="thumb"
                            width={80}
                            height={80}
                          />
                        );
                      })
                    }
                  >
                    {product.image.map((image, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            width: "100%",
                          }}
                        >
                          <Image
                            key={index}
                            src={`https://e-com.incrix.com/RKR%20Crackers/${image}`}
                            alt={product.name}
                            width={800} // provide dimensions
                            height={600}
                            style={{ width: "100%", height: "auto" }}
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                </Stack>
                <Stack gap={2} width={"100%"}>
                  <span
                    style={{
                      color: "var(--secondary)",
                      fontWeight: "bold",
                      fontSize: "14px",
                      backgroundColor: "var(--category-color)",
                      borderRadius: "5px",
                      padding: "5px",
                      width: "70px",
                      textAlign: "center",
                    }}
                  >
                    Sale Off
                  </span>
                  <Typography
                    className={quicksand.className}
                    variant={"h4"}
                    fontWeight={600}
                  >
                    {product.name}
                  </Typography>
                  <Stack direction={"row"} gap={2} alignItems={"center"}>
                    <Typography
                      className={quicksand.className}
                      variant={"h5"}
                      fontSize={40}
                      color={"var(--primary)"}
                      fontWeight={700}
                    >
                      ₹
                      {Math.ceil(
                        product.price - product.price * (product.discount / 100)
                      )}
                    </Typography>
                    <Typography
                      className={quicksand.className}
                      variant={"h5"}
                      fontSize={20}
                      color={"var(--secondary)"}
                    >
                      <s>₹{product.price}</s>
                    </Typography>
                    <Typography
                      className={quicksand.className}
                      color={"var(--tertiary)"}
                      variant={"h5"}
                    >
                      {product.discount}% off
                    </Typography>
                  </Stack>
                  <Typography
                    className={quicksand.className}
                    variant={"h6"}
                    fontSize={16}
                    // color={"var(--secondary)"}
                  >
                    {product.shortDescription}
                  </Typography>
                  <Stack direction={"row"} gap={2}>
                    <ButtonGroup>
                      <Button
                        // disableElevation
                        variant={"contained"}
                        color={"primary"}
                        sx={{
                          fontWeight: "bold",
                          fontSize: "20px",
                          backgroundColor: "var(--secondary)",
                          "&:hover": {
                            backgroundColor: "var(--secondary)",
                          },
                        }}
                        onClick={() => {
                          itemCount > 1 && setItemCount(itemCount - 1);
                        }}
                      >
                        -
                      </Button>
                      <Typography
                        className={quicksand.className}
                        // variant={"h5"}
                        // backgroundColor={"var(--secondary)"}
                        color={"var(--secondary)"}
                        width={50}
                        textAlign={"center"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        fontWeight={600}
                        fontSize={"20px"}
                        sx={{
                          fontSize: { xs: "12px", md: "20px" },
                        }}
                      >
                        {itemCount}
                      </Typography>
                      <Button
                        // disableElevation
                        variant={"contained"}
                        sx={{
                          fontWeight: "bold",
                          fontSize: "20px",
                          backgroundColor: "var(--secondary)",
                          "&:hover": {
                            backgroundColor: "var(--secondary)",
                          },
                        }}
                        onClick={() => {
                          setItemCount(itemCount + 1);
                        }}
                      >
                        +
                      </Button>
                    </ButtonGroup>
                    <Button
                      disableElevation
                      variant={"contained"}
                      sx={{
                        textTransform: "capitalize",
                        backgroundColor: "var(--tertiary)",
                        "&:hover": {
                          backgroundColor: "var(--tertiary)",
                        },
                      }}
                      onClick={() => {
                        let cart =
                          JSON.parse(localStorage.getItem("cart")) || [];
                        let item = cart.filter(
                          (item) => item.id == product.id
                        )[0];
                        if (item) {
                          item.count += itemCount;
                        } else {
                          cart.push({ ...product, count: itemCount });
                        }
                        localStorage.setItem("cart", JSON.stringify(cart));
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Stack>
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                    gap={2}
                    alignItems={{
                      xs: "flex-start",
                      sm: "center",
                    }}
                  >
                    <Stack direction={"row"} gap={1} alignItems={"center"}>
                      <Typography
                        className={quicksand.className}
                        variant={"paragraph"}
                        color={"var(--text-color-trinary)"}
                      >
                        Category:
                      </Typography>
                      <Typography
                        className={quicksand.className}
                        variant={"paragraph"}
                        color={"var(--primary)"}
                        fontWeight={"bold"}
                      >
                        {product.category}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} gap={1} alignItems={"center"}>
                      <Typography
                        className={quicksand.className}
                        variant={"paragraph"}
                        color={"var(--text-color-trinary)"}
                      >
                        Stock:
                      </Typography>
                      <Typography
                        className={quicksand.className}
                        variant={"paragraph"}
                        color={"var(--primary)"}
                        fontWeight={"bold"}
                      >
                        {product.countInStock} Items In Stock
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} gap={1} alignItems={"center"}>
                      <Typography
                        className={quicksand.className}
                        variant={"paragraph"}
                        color={"var(--text-color-trinary)"}
                      >
                        SKU:
                      </Typography>
                      <Typography
                        className={quicksand.className}
                        variant={"paragraph"}
                        color={"var(--primary)"}
                        fontWeight={"bold"}
                      >
                        {product.sku}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack
                  sx={{
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "none",
                      lg: "block",
                      xl: "block",
                    },
                  }}
                >
                  <HeroCategory />
                </Stack>
              </Stack>
            )}
            <Stack
              padding={{
                sm: "0px",
                md: "40px",
              }}
              margin={"40px 0"}
              gap={2}
              border={{
                sm: "none",
                md: "1px solid #ECECEC",
              }}
              borderRadius={4}
            >
              <Typography
                className={quicksand.className}
                variant={"h4"}
                fontWeight={600}
              >
                Description
              </Typography>
              <Typography
                color={"var(--text-color-secondary)"}
                className={quicksand.className}
              >
                {product && product.description}
              </Typography>
            </Stack>

            <Stack
              padding={{
                sm: "0px",
                md: "40px",
              }}
              margin={"40px 0"}
              gap={2}
              border={{
                sm: "none",
                md: "1px solid #ECECEC",
              }}
              borderRadius={4}
            >
              <Typography
                className={quicksand.className}
                variant={"h4"}
                fontWeight={600}
              >
                Related Products
              </Typography>
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
                }}
              >
                {product &&
                  productList.length != 0 &&
                  productList.map((item, index) => {
                    return (
                      product.category === item.category &&
                      product.id != item.id && (
                        <ProductCard key={index} product={item} />
                      )
                    );
                  })}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
}
