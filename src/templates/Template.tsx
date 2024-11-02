import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import ParticlesBackground from "./ParticlesBackground";
import { ReactNode, useState } from "react";
import { Toaster } from "../components/ui/toaster";
import {
  ColorModeButton,
  useColorModeValue,
} from "../components/ui/color-mode";
import Scrollbar from "./Scrollbar";

interface TemplateProps {
  children: ReactNode;
}

export default function Template({ children }: TemplateProps) {
  const [particlesLoaded, setParticlesLoaded] = useState(false);

  const handleParticlesLoad = () => {
    setParticlesLoaded(true);
  };

  return (
    <>
      <ParticlesBackground onLoad={handleParticlesLoad} />
      <Scrollbar />
      <Box
        position="relative"
        zIndex={1}
        minHeight="100vh"
        bg={particlesLoaded ? "transparent" : "black"}
        background={
          particlesLoaded
            ? "transparent"
            : useColorModeValue(
                "linear-gradient(-30deg, #00d2ff, #3a7bd5)",
                "linear-gradient(-30deg, #18181b, #111111)"
              )
        }
      >
        <Navbar />
        <Toaster />
        <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }} py={6}>
          {children}
        </Box>
        <ColorModeButton position={"absolute"} top={5} right={5} />
      </Box>
    </>
  );
}
