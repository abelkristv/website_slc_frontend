import { useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { TeachingHistory } from "../../../models/TeachingHistory";
import { useColorModeValue } from "../../../components/ui/color-mode";

interface ArrowProps {
  onClick?: () => void;
  currentSlide: number;
  slideCount?: number;
}

export const PrevArrow = ({ onClick, currentSlide }: ArrowProps) => (
  <IoChevronBack
    onClick={currentSlide > 0 ? onClick : undefined}
    color={
      currentSlide > 0
        ? useColorModeValue("transparent", "white")
        : useColorModeValue("transparent", "black")
    }
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
      color={
        currentSlide < (slideCount || 1) + slideLimit
          ? useColorModeValue("transparent", "white")
          : useColorModeValue("transparent", "black")
      }
      style={{
        cursor: currentSlide < (slideCount || 1) + slideLimit ? "pointer" : "",
        position: "absolute",
        right: -19,
        bottom: 16.5,
      }}
    />
  );
};

export const getSliderSettings = (
  teachingHistories: TeachingHistory[],
  currentSlide: number,
  setCurrentSlide: (value: number) => void
) => ({
  infinite: false,
  speed: 500,
  slidesToShow: teachingHistories.length > 2 ? 3 : 1,
  slidesToScroll: 1,
  prevArrow: <PrevArrow currentSlide={currentSlide} />,
  nextArrow: (
    <NextArrow
      currentSlide={currentSlide}
      slideCount={teachingHistories.length}
    />
  ),
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: teachingHistories.length > 2 ? 2 : 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (current: number) => setCurrentSlide(current),
      },
    },
  ],
  beforeChange: (_: number, next: number) => setCurrentSlide(next),
  variableWidth: teachingHistories.length > 2 ? false : true,
});
