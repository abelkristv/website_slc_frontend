import { IconButton } from "@chakra-ui/react";

export const CarouselPrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <IconButton
      aria-label="Previous slide"
      className={className}
      onClick={onClick}
      style={{
        ...style,
        position: "absolute",
        top: "50%",
        left: "2px",
        transform: "translateY(-50%)",
        zIndex: 10,
        textShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
      }}
    ></IconButton>
  );
};

export const CarouselNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <IconButton
      aria-label="Next slide"
      className={className}
      onClick={onClick}
      style={{
        ...style,
        position: "absolute",
        top: "50%",
        right: "2px",
        transform: "translateY(-50%)",
        zIndex: 10,
        textShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
      }}
      fontSize={"20px"}
    ></IconButton>
  );
};
