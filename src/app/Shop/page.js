"use client";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useInView } from 'react-intersection-observer';
import NavBar from "@/src/app/Components/HomePage/navBar";
import ProductTab from "@/src/app/Shop/Components/productTab";
import ShopByCategory from "@/src/app/Shop/Components/shopCategory";
import Footer from "@/src/app/Components/HomePage/footer";
import PdfCartFloating from "@/src/app/Components/FloatingIcons/pdfCartFloating";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import FloatingTopButton from "@/src/app/Components/FloatingIcons/floatingTopButton";

const AnimatedSection = ({ children, animationType = 'fadeUp', delay = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const animations = {
    fadeUp: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(60px)',
    },
    slideInLeft: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateX(0)' : 'translateX(-60px)',
    },
    zoomIn: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'scale(1)' : 'scale(0.8)',
    },
    rotateIn: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'rotate(0deg) scale(1)' : 'rotate(-15deg) scale(0.9)',
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        ...animations[animationType],
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </Box>
  );
};

function ShopContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    console.log(category);
  }, [category]);

  return (
    <Stack
      sx={{
        px: { xs: 0, md: 3 },
        mx: { xs: 2, md: 3 },
        mt: { xs: 12, md: 12 },
      }}
    >
      <ShopByCategory />
      <ProductTab category={category} />
    </Stack>
  );
}

export default function Shop() {
  return (
    <Stack position="relative" minHeight="100vh">
      <NavBar />
      <Suspense fallback={<Stack>Loading shop...</Stack>}>
        <AnimatedSection animationType="fadeUp" delay={0.1}>
          <ShopContent />
        </AnimatedSection>
      </Suspense>
      <Stack mt={{ xs: 10, md: 10 }}>
        <Footer />
      </Stack>
      <PdfCartFloating />
      <FloatingTopButton />
    </Stack>
  );
}