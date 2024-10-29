import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  IconButton,
  Button,
  Link,
  HStack,
  VStack,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import binus from "../assets/binus.png";
import ribbon from "../assets/ribbon.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Assistants", path: "/assistants" },
    { name: "Events", path: "/events" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <Box as="nav" boxShadow="md" bg="white" zIndex="10">
      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
        <Flex justify="space-between" align="center">
          <HStack spacing={4} mb={3}>
            <Image src={ribbon} alt="Ribbon" height={16} />
            <Image src={binus} alt="Binus" height={16} pt={2} />
          </HStack>

          <HStack spacing={8} display={{ base: "none", md: "flex" }}>
            {menuItems.map((item) => (
              <Link
                as={RouterLink}
                key={item.name}
                to={item.path}
                fontSize="md"
                fontWeight={
                  location.pathname === item.path ? "semibold" : "medium"
                }
                color={
                  location.pathname === item.path ? "blue.600" : "gray.700"
                }
                _hover={{ color: "blue.500" }}
              >
                {item.name}
              </Link>
            ))}
          </HStack>

          <HStack spacing={4} display={{ base: "none", md: "flex" }}>
            <Button
              colorScheme="blue"
              variant="outline"
              size="sm"
              borderRadius="full"
              _hover={{ bg: "blue.50" }}
            >
              Become a Part of Us
            </Button>
            <Button
              colorScheme="blue"
              size="sm"
              borderRadius="full"
              _hover={{ bg: "blue.600" }}
              onClick={() => navigate("/login")}
            >
              Login for Assistant
            </Button>
          </HStack>

          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="outline"
            onClick={onToggle}
            display={{ md: "none" }}
            aria-label="Toggle navigation menu"
          />
        </Flex>

        {isOpen && (
          <VStack spacing={4} align="center" display={{ md: "none" }} pb={4}>
            {menuItems.map((item) => (
              <Link
                as={RouterLink}
                key={item.name}
                to={item.path}
                fontSize="lg"
                fontWeight={
                  location.pathname === item.path ? "semibold" : "medium"
                }
                color={
                  location.pathname === item.path ? "blue.600" : "gray.700"
                }
                _hover={{ color: "blue.500" }}
                onClick={onToggle}
              >
                {item.name}
              </Link>
            ))}
            <Button
              colorScheme="blue"
              variant="outline"
              size="sm"
              borderRadius="full"
              _hover={{ bg: "blue.50" }}
              onClick={onToggle}
            >
              Become a Part of Us
            </Button>
            <Button
              colorScheme="blue"
              size="sm"
              borderRadius="full"
              _hover={{ bg: "blue.600" }}
              onClick={() => {
                onToggle();
                navigate("/login");
              }}
            >
              Login for Assistant
            </Button>
          </VStack>
        )}
      </Box>
    </Box>
  );
}
