"use client";

import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ShoppingCart } from "@mui/icons-material";
import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import Image from "next/image";

export default function ProductCard({ product }) {
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const router = useRouter();
  const pathArray = usePathname().split("/");

  const handleIncrement = () => {
    if (isAdded) {
      cart.map((item) => {
        if (item.id == product.id) {
          item.count += 1;
          setCount(item.count);
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      });
    } else {
      setCount(count + 1);
    }
  };
  const handleDecrement = () => {
    if (isAdded) {
      cart.map((item) => {
        if (item.id == product.id) {
          if (item.count > 1) {
            item.count -= 1;
            setCount(item.count);
            localStorage.setItem("cart", JSON.stringify(cart));
          } else {
            let newCart = cart.filter((item) => item.id != product.id);
            localStorage.setItem("cart", JSON.stringify(newCart));
            setIsAdded(false);
            handleOpen();
            setCount(1);
          }
        }
      });
    } else {
      if (count > 1) {
        setCount(count - 1);
      }
    }
  };
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const isProductAdded = useCallback(() => {
    let item = cart.filter((item) => item.id == product.id)[0];
    if (item) {
      setIsAdded(true);
      setCount(item.count);
      // console.log(item.count);
    } else {
      setIsAdded(false);
      setCount(1);
    }
  }, [cart, product.id]); // Dependencies for useCallback

  useEffect(() => {
    isProductAdded();
  }, [cart, isProductAdded]);

  return (
    <Paper
      sx={{
        margin: {
          xs: "0 10px",
          sm: "0",
        },
        width: {
          xs: "100%",
          sm: "300px",
        },
        position: "relative",
        p: {
          xs: "10px",
        },
        borderRadius: "15px",
        backgroundColor: "var(--card-color)",
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={isAdded ? "success" : "info"}
          sx={{ width: "100%" }}
        >
          {product.name + (!isAdded ? ` removed from cart` : ` added to cart`)}
        </Alert>
      </Snackbar>
      <Stack
        direction={{ xs: "column", md: "column" }}
        gap={{ xs: "2", md: "0" }}
      >
        {product.badge && (
          <div
            style={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              top: 0,
              left: 0,
              width: "60px",
              height: "30px",
              borderRadius: "15px 0 15px  0",
              background: "var(--primary)",
              fontSize: "10px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {product.badge}
          </div>
        )}
        <Stack>
          <Image
            src={`https://e-com.incrix.com/Sankamithra%20Products/${product.image[0]}`}
            alt={product.name || "Product image"} // Use a descriptive alt text
            width={100} // Set explicit width (adjust based on your design)
            height={100} // Set explicit height (adjust based on your design)
            style={{
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "10px",
              cursor: "pointer",
              width: "100%",
              height: "100%",
            }}
            onClick={() => {
              pathArray.length > 2
                ? router.push(`product?id=${product.id}`)
                : router.push(`Shop/product?id=${product.id}`);
            }}
          />
        </Stack>
        <Stack>
          <Typography
            variant="p"
            color={"var(--text-color-trinary)"}
            pt={{
              xs: "5px",
              sm: "10px",
            }}
            fontSize={{ xs: "14px", md: "16px" }}
            onClick={() => {
              pathArray.length > 2 && pathArray[2] === "shop"
                ? router.push(`product?id=${product.id}`)
                : router.push(`shop/product?id=${product.id}`);
            }}
          >
            {product.category}
          </Typography>
          <Typography
            variant="p"
            color={"var(--text-color)"}
            fontSize={"16px"}
            fontWeight={"bold"}
            pt={{
              xs: "5px",
              sm: "10px",
            }}
            sx={{
              cursor: "pointer",
            }}
            onClick={() => {
              pathArray.length > 2 && pathArray[2] === "shop"
                ? router.push(`product?id=${product.id}`)
                : router.push(`shop/product?id=${product.id}`);
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="p"
            color={"var(--text-color-secondary)"}
            fontSize={"14px"}
            pt={{
              xs: "5px",
              sm: "10px",
            }}
          >
            By{" "}
            <font
              style={{
                color: "white",
                fontWeight: "bold",
                backgroundColor: "var(--secondary)",
                padding: "5px",
                width: "fit-content",
                borderRadius: "10px",
                fontSize: "12px",
              }}
            >
              RKR
            </font>
          </Typography>
          <Stack
            direction={"row"}
            gap={1}
            pt={{
              xs: "5px",
              sm: "10px",
            }}
          >
            <Typography
              variant="p"
              color={"var(--primary-color)"}
              fontSize={"14px"}
              fontWeight={"bold"}
            >
              ₹
              {Math.round(
                product.price - (product.discount / 100) * product.price
              )}
            </Typography>
            {product.discount && (
              <Typography
                variant="p"
                color={"var(--text-color-trinary)"}
                fontSize={"14px"}
                fontWeight={"bold"}
              >
                <s>₹{product.price}</s>
              </Typography>
            )}
            {product.discount && (
              <Typography
                variant="p"
                color={"var(--primary-color)"}
                fontSize={"14px"}
                fontWeight={"bold"}
              >
                (off %{product.discount})
              </Typography>
            )}
          </Stack>
          <Stack
            width={"100%"}
            direction={{
              xs: "column-reverse",
              md: "row",
            }}
            justifyContent={{ xs: "center", md: "space-between" }}
            paddingTop={2}
            paddingBottom={1}
            alignItems={{ xs: "center", md: "flex-start" }}
            gap={1}
          >
            <Button
              disableElevation
              variant="contained"
              sx={{
                color: "white",
                fontSize: { xs: "12px", md: "14px" },
                fontWeight: "bold",
                textTransform: "none",
                backgroundColor: "var(--primary)",
                "&:hover": {
                  backgroundColor: "var(--primary)",
                },
                width: { xs: "180px", md: "fit-content" },
              }}
              startIcon={!isAdded && <ShoppingCart />}
              onClick={() => {
                if (!isAdded) {
                  let cart = JSON.parse(localStorage.getItem("cart")) || [];
                  let item = cart.filter((item) => item.id == product.id)[0];
                  if (item) {
                    item.count += count;
                  } else {
                    cart.push({ ...product, count: count });
                  }
                  localStorage.setItem("cart", JSON.stringify(cart));
                  setIsAdded(true);
                  handleOpen();
                } else {
                  //remove item from cart
                  let cart = JSON.parse(localStorage.getItem("cart")) || [];
                  let newCart = cart.filter((item) => item.id != product.id);
                  localStorage.setItem("cart", JSON.stringify(newCart));
                  setIsAdded(false);
                  handleOpen();
                }
              }}
            >
              {isAdded ? "Remove" : "Add"}
            </Button>
            <Stack direction={"row"}>
              <Button
                // disableElevation
                variant="contained"
                fullWidth={false}
                sx={{
                  width: {
                    xs: "50px",
                    sm: "50px",
                    md: "20px",
                  },
                  color: "white",
                  borderRadius: "5px 0 0 5px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  textTransform: "none",
                  backgroundColor: "var(--primary)",
                  "&:hover": {
                    backgroundColor: "var(--primary)",
                  },
                }}
                onClick={handleDecrement}
              >
                <RemoveRoundedIcon />
              </Button>
              <Stack
                width={"100%"}
                justifyContent={"center"}
                sx={{
                  // backgroundColor: "var(--primary)",
                  minWidth: "30px",
                  textAlign: "center",
                  fontSize: { xs: "16px", md: "18px" },
                  fontWeight: "bold",
                  color: "var(--primary)",
                  width: { xs: "50px", md: "100%" },
                }}
              >
                {count}
              </Stack>
              <Button
                // disableElevation
                variant="contained"
                fullWidth={false}
                sx={{
                  width: {
                    xs: "40px",
                    sm: "50px",
                    md: "20px",
                  },
                  color: "white",
                  fontSize: "14px",
                  borderRadius: "0 5px 5px 0",
                  fontWeight: "bold",
                  textTransform: "none",
                  backgroundColor: "var(--primary)",
                  "&:hover": {
                    backgroundColor: "var(--primary)",
                  },
                }}
                onClick={handleIncrement}
              >
                <AddRoundedIcon />
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
