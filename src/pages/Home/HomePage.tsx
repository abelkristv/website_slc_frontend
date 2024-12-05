"use client";

import { useRef } from "react";
import { Box, VStack } from "@chakra-ui/react";
import { Carousel } from "./components/Carousel";
import { AboutUsSection } from "./components/AboutUsSection";
import { AlumniChart } from "./components/AlumniChart";
import img1 from "../../assets/carousel/1.jpg";
import img2 from "../../assets/carousel/2.jpg";

const carouselImages = [img1, img2];

const alumniData = [
  { name: "Tech Startups", value: 30 },
  { name: "Large Tech Companies", value: 25 },
  { name: "Education", value: 20 },
  { name: "Finance", value: 15 },
  { name: "Other Industries", value: 10 },
];

export default function HomePage() {
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  const scrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <VStack align="stretch">
      <Carousel images={carouselImages} onLearnMore={scrollToAbout} />
      <Box
        py={10}
        px={10}
        bg="primary"
        shadow="lg"
        rounded="lg"
        ref={aboutSectionRef}
      >
        <AboutUsSection />
      </Box>
      <Box py={10} width="full" bg="primary" shadow="lg" rounded="lg">
        <AlumniChart data={alumniData} />
      </Box>
    </VStack>
  );
}
