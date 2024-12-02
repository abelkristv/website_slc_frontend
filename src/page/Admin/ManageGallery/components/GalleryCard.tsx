import { Box, Flex, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import { Gallery } from "../../../../types/Gallery";

interface GalleryCardProps {
  gallery: Gallery;
}

export default function GalleryCard({ gallery }: GalleryCardProps) {
  const sliderSettings = {
    infinite: gallery.GalleryImages.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: gallery.GalleryImages.length > 1,
    autoplaySpeed: 5000,
  };
  return (
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
          {gallery.GalleryImages.map((image, imgIndex) => (
            <Box key={imgIndex}>
              <img
                src={image}
                alt={`Slide ${imgIndex + 1}`}
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "1/1",
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>
      {/* <Box px={4} pt={3} pb={2} mt={"-2"} zIndex={10} bg={"primary"}>
        <Flex direction="column" align="start" height="full">
          <Text
            fontWeight="bold"
            fontSize="lg"
            color="secondary"
            mb={2}
            lineClamp={"1"}
            textAlign={"left"}
          >
            {gallery.GalleryTitle || "Untitled"}
          </Text>
          <Text fontSize="sm" color="gray.500" mb={2}>
            {formatDate(gallery.UpdatedAt!) || "No Date"}
          </Text>
        </Flex>
      </Box> */}
    </Box>
  );
}
