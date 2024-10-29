import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import ParticlesBackground from "./ParticlesBackground";
import { ReactNode } from "react";
import { Toaster } from "../components/ui/toaster";

interface TemplateProps {
  children: ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return (
    <Box minHeight="100vh" display="flex" flexDir="column" overflowX="hidden">
      <Navbar />
      <Toaster />
      <Box flexGrow={1}>
        <ParticlesBackground />
        <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }} py={6}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
