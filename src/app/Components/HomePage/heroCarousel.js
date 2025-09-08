"use client";

import Stack from "@mui/material/Stack";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "@mui/material";

export default function HeroCarousel() {
  const isMobile = useMediaQuery("(max-width:600px)");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  // Define images based on screen size using provided URLs
  const images = isMobile
    ? [
        { src: "https://e-com.incrix.com/Radhey/mobileBanner1.png", alt: "Mobile Banner 1" },
        { src: "https://e-com.incrix.com/Radhey/mobileBanner2.png", alt: "Mobile Banner 2" },
      ]
    : [
        { src: "https://e-com.incrix.com/Radhey/banner1.png", alt: "Banner 1" },
        { src: "https://e-com.incrix.com/Radhey/banner2.png", alt: "Banner 2" },
      ];

  return (
    <Stack
      sx={{
        px: { xs: 0, md: 3 },
        mx: { xs: 2, md: 3 },
        mt: { xs: 12, md: 12 },
      }}
    >
      <Stack
        width="100%"
        sx={{
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Slider {...settings}>
          {images.map((image, index) => (
            <div className="carousel-item" key={index}>
              <Image
                width={100}
                height={100}
                src={image.src}
                alt={image.alt}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                priority={index === 0} // Only prioritize the first image
              />
            </div>
          ))}
        </Slider>
      </Stack>

      <style jsx global>{`
        /* Default: 2:1 ratio */
        .carousel-item {
          position: relative;
          width: 100%;
        }

        /* Mobile override: fixed 650px height */
        @media (max-width: 600px) {
          .carousel-item {
            padding-top: 0;
            height: 650px;
          }
        }

        .slick-slide > div {
          display: flex;
        }

        .slick-dots {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
        }

        .slick-dots li button:before {
          fontSize: 10px;
          color: white;
          opacity: 0.7;
        }

        .slick-dots li.slick-active button:before {
          color: #fff;
          opacity: 1;
        }
      `}</style>
    </Stack>
  );
}