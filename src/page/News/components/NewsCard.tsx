import { Box, Flex, Text, Button } from "@chakra-ui/react";
import Slider from "react-slick";
import { useState } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

export default function NewsCard({
  title,
  date,
  description,
  images,
}: {
  title: string;
  date: string;
  description: string;
  images: string[];
}) {
  const [open, setOpen] = useState(false);

  const sliderSettings = {
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: images.length > 1,
    autoplaySpeed: 5000,
  };

  const sliderDetailSettings = {
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: images.length > 1,
    autoplaySpeed: 5000,
    dots: true, // Enable dots
    arrows: true, // Enable previous/next buttons
  };

  return (
    <DialogRoot
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      scrollBehavior={"inside"}
    >
      <DialogTrigger>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="sm"
          bg="primary"
          width="full"
          display="flex"
          flexDirection="column"
          cursor={"pointer"}
          justifyContent={"space-between"}
        >
          <Box
            width="100%"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.02)" }}
          >
            <Slider {...sliderSettings}>
              {images.map((image, imgIndex) => (
                <Box key={imgIndex}>
                  <img
                    src={image}
                    alt={`Slide ${imgIndex + 1}`}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Box>
              ))}
            </Slider>
          </Box>
          <Box px={4} pt={3} pb={2} mt={"-2"} zIndex={10} bg={"primary"}>
            <Flex direction="column" align="start" height="full">
              <Text
                fontWeight="bold"
                fontSize="lg"
                color="secondary"
                mb={2}
                lineClamp={"1"}
                textAlign={"left"}
              >
                {title || "Untitled"}
              </Text>
              <Text fontSize="sm" color="gray.500" mb={2}>
                {date || "No Date"}
              </Text>
            </Flex>
          </Box>
        </Box>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {title || "Untitled"}{" "}
            <Text fontSize="xs" color="gray.500" mb={2} fontWeight={"normal"}>
              {date || "No Date"}
            </Text>
          </DialogTitle>
        </DialogHeader>
        <DialogBody mt={-4}>
          <Text fontSize="sm" color="gray.700" mb={6} whiteSpace={"pre-line"}>
            {description || "No description available."}
          </Text>
          <Box overflow={"hidden"} pb={5}>
            <Slider {...sliderDetailSettings}>
              {" "}
              {/* Use sliderDetailSettings here */}
              {images.map((image, imgIndex) => (
                <Box key={imgIndex}>
                  <img
                    src={image}
                    alt={`Slide ${imgIndex + 1}`}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Box>
              ))}
            </Slider>
          </Box>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
