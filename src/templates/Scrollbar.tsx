import { Global } from "@emotion/react";
import { useColorModeValue } from "../components/ui/color-mode";

export default function Scrollbar() {
  const scrollbarThumbColor = useColorModeValue("#646464", "#3f3f46");

  return (
    <Global
      styles={{
        "::-webkit-scrollbar": {
          width: "8px",
        },
        "::-webkit-scrollbar:horizontal": {
          height: "8px",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: scrollbarThumbColor,
        },
        "::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
      }}
    />
  );
}
