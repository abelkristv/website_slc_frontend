import { Link, useLocation } from "react-router-dom";
import { Box, Flex, HStack, Image, Button } from "@chakra-ui/react";
import binus from "../assets/binus.png";
import binus_dark from "../assets/binus_dark.png";
import ribbon from "../assets/ribbon.png";
import { useColorModeValue } from "./ui/color-mode";
import { useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { menuLinks } from "./data/menuLinks";
import GuestAuthMenu from "./AuthMenu/GuestAuthMenu";
import UserAuthMenu from "./AuthMenu/UserAuthMenu";

export default function Navbar() {
  const location = useLocation();
  const { user, getCurrentUser } = useUser();

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Box as="nav" boxShadow="lg" bg="primary">
      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
        <Flex justify="space-between" align="center">
          <HStack gap={4} mb={3}>
            <Image src={ribbon} alt="Ribbon" height={16} />
            <Image
              src={useColorModeValue(binus, binus_dark)}
              alt="Binus"
              height={16}
              pt={2}
            />
          </HStack>

          <HStack gap={2} display={{ base: "none", md: "flex" }}>
            {menuLinks.map((item) => (
              <Link key={item.name} to={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  color={
                    location.pathname === item.path
                      ? "bluejack.100"
                      : "secondary"
                  }
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </HStack>

          {!user ? <GuestAuthMenu /> : <UserAuthMenu />}
        </Flex>
      </Box>
    </Box>
  );
}
