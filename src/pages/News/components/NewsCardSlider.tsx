import { Box } from "@chakra-ui/react";
import Slider from "react-slick";

interface NewsCardSliderProps {
  images: string[];
}

export default function NewsCardSlider({ images }: NewsCardSliderProps) {
  const sliderSettings = {
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: images.length > 1,
    autoplaySpeed: 5000,
  };

  return (
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
                aspectRatio: "1/1",
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
