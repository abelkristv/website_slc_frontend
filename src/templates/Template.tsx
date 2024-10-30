import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import ParticlesBackground from "./ParticlesBackground";
import { ReactNode, useState } from "react";
import { Toaster } from "../components/ui/toaster";

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

      <Box
        position="relative"
        zIndex={1}
        minHeight="100vh"
        bgColor={particlesLoaded ? "transparent" : "black"}
        background={
          particlesLoaded
            ? "transparent"
            : "linear-gradient(-30deg, #00d2ff, #3a7bd5)"
        }
      >
        <Navbar />
        <Toaster />
        <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }} py={6}>
          {children}
        </Box>
      </Box>
    </>
  );
}
