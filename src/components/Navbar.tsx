import { Link, useLocation } from "react-router-dom";
import { Box, Flex, HStack, Image, Button, Text } from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa";
import binus from "../assets/binus.png";
import binus_dark from "../assets/binus_dark.png";
import ribbon from "../assets/ribbon.png";
import { MdLogin } from "react-icons/md";
import { ColorModeButton, useColorModeValue } from "./ui/color-mode";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "./ui/drawer";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  const location = useLocation();
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Assistants", path: "/assistants" },
    { name: "Events", path: "/events" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <Box as="nav" boxShadow="lg" bg="primary">
      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
        <Flex
          justify="space-between"
          align="center"
          py={{ base: "4.5", md: 0 }}
        >
          <HStack gap={4} mb={3} display={{ base: "none", md: "flex" }}>
            <Image src={ribbon} alt="Ribbon" height={16} />
            <Image
              src={useColorModeValue(binus, binus_dark)}
              alt="Binus"
              height={16}
              pt={2}
            />
          </HStack>
          <Box display={{ base: "block", md: "none" }}>
            <DrawerRoot placement={"start"}>
              <DrawerBackdrop />
              <DrawerTrigger asChild>
                <Button variant="outline" aria-label="Open Menu" size="md">
                  <FiMenu />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <HStack mt={-6} alignItems={"start"}>
                    <Image src={ribbon} alt="Ribbon" height={12} />
                    <Image
                      src={useColorModeValue(binus, binus_dark)}
                      alt="Binus"
                      height={16}
                      mt={2}
                    />
                  </HStack>
                </DrawerHeader>
                <DrawerBody>
                  <DrawerActionTrigger w={"full"}>
                    {menuItems.map((item) => (
                      <Link key={item.name} to={item.path}>
                        <Text
                          color={
                            location.pathname === item.path
                              ? "bluejack.100"
                              : "secondary"
                          }
                          w="full"
                          mt={2}
                          mb={6}
                          ml={10}
                          textAlign={"left"}
                          fontSize={"md"}
                          fontWeight={"semibold"}
                        >
                          {item.name}
                        </Text>
                      </Link>
                    ))}
                  </DrawerActionTrigger>
                </DrawerBody>
                <DrawerCloseTrigger />
              </DrawerContent>
            </DrawerRoot>
          </Box>

          <HStack gap={2} display={{ base: "none", md: "flex" }}>
            {menuItems.map((item) => (
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

          <HStack gap={2}>
            <Link to="/join-us">
              <Button
                variant="solid"
                color="white"
                rounded="md"
                size={"sm"}
                bg="bluejack.100"
                _hover={{ bg: "bluejack.200" }}
              >
                <FaUserPlus />
                <Box as="span" ml={1}>
                  Join Us
                </Box>
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                borderColor="bluejack.100"
                color="bluejack.100"
                rounded="md"
                size={"sm"}
                _hover={useColorModeValue(
                  { bg: "blue.50" },
                  { bg: "gray.800" }
                )}
              >
                <MdLogin />
                <Box as="span" ml={1}>
                  Login
                </Box>
              </Button>
            </Link>
            <ColorModeButton rounded="full" ml={1} />
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}
