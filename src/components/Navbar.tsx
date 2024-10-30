import { Link, useLocation } from "react-router-dom";
import { Box, Flex, HStack, Image, Button } from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa";
import binus from "../assets/binus.png";
import ribbon from "../assets/ribbon.png";
import { MdLogin } from "react-icons/md";

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

          <HStack gap={2} display={{ base: "none", md: "flex" }}>
            {menuItems.map((item) => (
              <Link key={item.name} to={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  color={
                    location.pathname === item.path ? "#3a7bd5" : "gray.700"
                  }
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </HStack>

          <HStack gap={2}>
            <Link to="/register">
              <Button
                variant="solid"
                colorScheme="blue"
                color="white"
                rounded="md"
                size="sm"
                bg="#3a7bd5"
                _hover={{ bg: "#336ab3" }}
              >
                <FaUserPlus />
                Join Us
              </Button>
            </Link>
            <Link to="/login">
              <Button
                colorScheme="teal"
                variant="outline"
                borderColor="#4a90e2"
                color="#4a90e2"
                rounded="md"
                size="sm"
                _hover={{ bg: "blue.50" }}
              >
                <MdLogin />
                Login
              </Button>
            </Link>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}
