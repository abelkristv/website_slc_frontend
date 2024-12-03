import { Box } from "@chakra-ui/react";
import Slider from "react-slick";
import { CarouselNextArrow, CarouselPrevArrow } from "./CarouselArrow";

interface GalleryDetailSliderProps {
  images: string[];
}

export default function GalleryDetailSlider({
  images,
}: GalleryDetailSliderProps) {
  const sliderDetailSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: images.length > 1,
    prevArrow: <CarouselPrevArrow />,
    nextArrow: <CarouselNextArrow />,
    adaptiveHeight: true,
  };

  return (
    <Box overflow={"hidden"} pb={5}>
      <Slider {...sliderDetailSettings}>
        {images.map((image, imgIndex) => (
          <Box key={imgIndex}>
            <img
              src={image}
              alt={`Slide ${imgIndex + 1}`}
              style={{
                width: "100%",
                height: "auto",
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
