"use client";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useInView } from 'react-intersection-observer';
import NavBar from "@/src/app/Components/HomePage/navBar";
import MyProcess from "@/src/app/About/Components/myProcess";
import AboutUs from "@/src/app/About/Components/aboutUs";
import Offer from "@/src/app/About/Components/offer";
import DoDont from "@/src/app/Components/HomePage/doDont";
import Footer from "@/src/app/Components/HomePage/footer";
import PdfCartFloating from "@/src/app/Components/FloatingIcons/pdfCartFloating";

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
        transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </Box>
  );
};

export default function About() {
  return (
    <Stack position="relative" minHeight="100vh">
      <NavBar />
      <AnimatedSection animationType="fadeUp" delay={0.1}>
        <MyProcess />
      </AnimatedSection>
      <AnimatedSection animationType="slideInLeft" delay={0.2}>
        <AboutUs />
      </AnimatedSection>
      <AnimatedSection animationType="zoomIn" delay={0.3}>
        <Offer />
      </AnimatedSection>
      <AnimatedSection animationType="slideInLeft" delay={0.4}>
        <DoDont />
      </AnimatedSection>
      <AnimatedSection animationType="zoomIn" delay={0.4}>
        <Footer />
      </AnimatedSection>
      <PdfCartFloating />
    </Stack>
  );
}