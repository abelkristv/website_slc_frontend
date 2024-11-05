import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { ReactNode } from "react";
import { Toaster } from "../components/ui/toaster";
import Scrollbar from "./Scrollbar";
import { useLocation } from "react-router-dom";

interface TemplateProps {
  children: ReactNode;
}

export default function Template({ children }: TemplateProps) {
  const location = useLocation();
  const isJoinUsPage = location.pathname === "/join-us";

  return (
    <>
      <Scrollbar />
      <Box position="relative" zIndex={1} minHeight="100vh">
        <Navbar />
        <Toaster />
        <Box
          maxW={isJoinUsPage ? "" : "7xl"}
          mx="auto"
          px={isJoinUsPage ? 0 : { base: 4, sm: 6, lg: 8 }}
          py={isJoinUsPage ? 0 : 6}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
