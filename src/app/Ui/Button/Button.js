"use client";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

// Custom styled MUI button
const CustomStyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: "8px 16px",
  fontWeight: 500,
  maxWidth: "200px",
  height: "40px",
  color: "#fff",
}));

export default function CustomButton({ children, ...props }) {
  return <CustomStyledButton {...props}>{children}</CustomStyledButton>;
}

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
};
