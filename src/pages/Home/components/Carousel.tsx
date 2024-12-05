"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

interface CarouselProps {
  images: string[];
  onLearnMore: () => void;
}

export function Carousel({ images, onLearnMore }: CarouselProps) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box
      position="relative"
      height="60vh"
      width="full"
      overflow="hidden"
      borderRadius="lg"
      shadow="md"
    >
      {images.map((img, index) => (
        <Box
          key={index}
          position="absolute"
          inset={0}
          transition="opacity 1s"
          opacity={index === currentImage ? 1 : 0}
          zIndex={1}
        >
          <Image
            src={img}
            alt={`Carousel image ${index + 1}`}
            objectFit="cover"
            width="full"
            height="full"
          />
        </Box>
      ))}
      <Box position="absolute" inset={0} bg="blackAlpha.500" zIndex={2} />
      <Flex
        position="absolute"
        inset={0}
        alignItems="center"
        justifyContent="center"
        zIndex={3}
      >
        <VStack textAlign="center" color="white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading as="h1" size="4xl" mb={4}>
              Software Laboratory Center
            </Heading>
            <Text fontSize="xl" mb={8}>
              Empowering Students with Practical Software Skills
            </Text>
            <Button onClick={onLearnMore}>
              Learn More <BsArrowRight />
            </Button>
          </motion.div>
        </VStack>
      </Flex>
      <Button
        position="absolute"
        left={4}
        top="50%"
        transform="translateY(-50%)"
        bg="whiteAlpha.500"
        rounded="full"
        zIndex={4}
        onClick={() =>
          setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
        }
        aria-label="Previous image"
      >
        <BiChevronLeft />
      </Button>
      <Button
        position="absolute"
        right={4}
        top="50%"
        transform="translateY(-50%)"
        bg="whiteAlpha.500"
        rounded="full"
        zIndex={4}
        onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
        aria-label="Next image"
      >
        <BiChevronRight />
      </Button>
    </Box>
  );
}
