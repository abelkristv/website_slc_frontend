import { useState, useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface ArrowProps {
  onClick?: () => void;
  currentSlide: number;
  slideCount?: number;
}

export const PrevArrow = ({ onClick, currentSlide }: ArrowProps) => (
  <IoChevronBack
    onClick={currentSlide > 0 ? onClick : undefined}
    color={currentSlide > 0 ? "black" : "white"}
    style={{
      cursor: currentSlide > 0 ? "pointer" : "",
      position: "absolute",
      left: -19,
      top: 14,
    }}
  />
);

export const NextArrow = ({
  onClick,
  currentSlide,
  slideCount,
}: ArrowProps) => {
  const [slideLimit, setSlideLimit] = useState<number>(-3);

  useEffect(() => {
    const updateSlideLimit = () => {
      if (window.innerWidth > 1200) {
        setSlideLimit(-3);
      } else if (window.innerWidth > 600) {
        setSlideLimit(-2);
      } else {
        setSlideLimit(-1);
      }
    };

    updateSlideLimit();
    window.addEventListener("resize", updateSlideLimit);

    return () => window.removeEventListener("resize", updateSlideLimit);
  }, []);

  return (
    <IoChevronForward
      onClick={
        currentSlide < (slideCount || 1) + slideLimit ? onClick : undefined
      }
      color={currentSlide < (slideCount || 1) + slideLimit ? "black" : "white"}
      style={{
        cursor: currentSlide < (slideCount || 1) + slideLimit ? "pointer" : "",
        position: "absolute",
        right: -21.5,
        bottom: 16.5,
      }}
    />
  );
};
