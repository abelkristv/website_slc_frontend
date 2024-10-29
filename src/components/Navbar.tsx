import { Link, useLocation } from "react-router-dom";
import { Box, Flex, HStack, Image, Button } from "@chakra-ui/react";
import binus from "../assets/binus.png";
import ribbon from "../assets/ribbon.png";

export default function Navbar() {
  const location = useLocation();
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Assistants", path: "/assistants" },
    { name: "Events", path: "/events" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <Box as="nav" boxShadow="lg" bgColor="white">
      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
        <Flex justify="space-between" align="center">
          <HStack gap={4} mb={3}>
            <Image src={ribbon} alt="Ribbon" height={16} />
            <Image src={binus} alt="Binus" height={16} pt={2} />
          </HStack>

          <HStack gap={4} display={{ base: "none", md: "flex" }}>
            {menuItems.map((item) => (
              <Link key={item.name} to={item.path}>
                <Button
                  variant="ghost"
                  size="xl"
                  color={
                    location.pathname === item.path ? "#3a7bd5" : "gray.700"
                  }
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </HStack>

          <HStack gap={4}>
            <Link to="/register">
              <Button
                variant="outline"
                colorScheme="blue"
                color="#3a7bd5"
                borderColor="#3a7bd5"
                rounded="full"
                size="sm"
                _hover={{ bg: "blue.50" }}
              >
                Become a Part of Us
              </Button>
            </Link>
            <Link to="/login">
              <Button
                colorScheme="blue"
                bg="#3a7bd5"
                color="white"
                rounded="full"
                size="sm"
                _hover={{ bg: "#336ab3" }}
              >
                Login for Assistant
              </Button>
            </Link>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}
