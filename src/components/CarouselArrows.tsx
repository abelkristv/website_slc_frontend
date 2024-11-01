import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export const PrevArrow = ({ onClick }: any) => (
  <IoChevronBack
    onClick={onClick}
    color="black"
    style={{ cursor: "pointer", position: "absolute", left: -22, top: 14 }}
  />
);

export const NextArrow = ({ onClick }: any) => (
  <IoChevronForward
    onClick={onClick}
    color="black"
    style={{
      cursor: "pointer",
      position: "absolute",
      right: -24,
      bottom: 16.5,
    }}
  />
);
