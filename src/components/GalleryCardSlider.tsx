import { Box } from "@chakra-ui/react";
import Slider from "react-slick";

interface GallerySliderProps {
  images: string[];
}

export default function GalleryCardSlider({ images }: GallerySliderProps) {
  const sliderSettings = {
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: images.length > 1,
    autoplaySpeed: 4000,
  };

  return (
    <Box
      width="100%"
      transition="transform 0.2s"
      transform={"scale(1.01)"}
      _hover={{ transform: "scale(1.025)" }}
    >
      <Slider {...sliderSettings}>
        {images.map((image, imgIndex) => (
          <Box key={imgIndex}>
            <img
              src={image}
              alt={`Slide ${imgIndex + 1}`}
              style={{
                width: "100%",
                aspectRatio: "1/1",
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
