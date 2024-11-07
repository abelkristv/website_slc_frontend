import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Flex, HStack, Image, Button, Text } from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa";
import binus from "../assets/binus.png";
import binus_dark from "../assets/binus_dark.png";
import ribbon from "../assets/ribbon.png";
import {
  MdElectricBolt,
  MdLockOpen,
  MdLogin,
  MdLogout,
  MdOutlinePerson,
} from "react-icons/md";
import { ColorModeButton, useColorModeValue } from "./ui/color-mode";
import MobileDrawer from "./MobileDrawer";
import { useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { Avatar } from "./ui/avatar";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "./ui/menu";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";

export default function Navbar() {
  const location = useLocation();
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Assistants", path: "/assistants" },
    { name: "Events", path: "/events" },
    { name: "Contact Us", path: "/contact-us" },
  ];
  const { user, getCurrentUser, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      showSuccessToast("Logout successful");
      navigate("/");
    } catch (err: any) {
      const errorMessage = err.response?.data.message || "Logout failed";
      showErrorToast(errorMessage);
    } finally {
    }
  };

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

          {!user ? (
            <HStack gap={2}>
              <Link to="/join-us">
                <Button
                  display={{ base: "none", md: "flex" }}
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
                  display={{ base: "none", md: "flex" }}
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
              <Box display={{ base: "block", md: "none" }}>
                <MobileDrawer menuItems={menuItems} />
              </Box>
            </HStack>
          ) : (
            <HStack gap={0}>
              <MenuRoot>
                <MenuTrigger
                  outline={"none"}
                  border={"none"}
                  cursor={"pointer"}
                >
                  <Box
                    px={4}
                    py={2}
                    rounded={"md"}
                    _hover={{ bg: useColorModeValue("gray.100", "gray.900") }}
                    transition={"background 0.3s"}
                  >
                    {" "}
                    <HStack gap={4}>
                      <Avatar
                        colorPalette={"accent"}
                        name={user.Assistant.Initial}
                        src={user.Assistant.ProfilePicture}
                        size={"xs"}
                        css={{
                          outlineWidth: "2px",
                          outlineColor: "bluejack.100",
                          outlineOffset: "2px",
                          outlineStyle: "solid",
                        }}
                      />
                      <Text fontSize={"md"} fontWeight={"medium"}>
                        {user.Assistant.Initial} {user.Assistant.Generation}
                      </Text>
                    </HStack>
                  </Box>
                </MenuTrigger>
                <MenuContent p={0} width={"44"}>
                  <MenuItem
                    value="profile"
                    cursor={"pointer"}
                    py={2}
                    px={4}
                    onClick={() => navigate("/user/my-profile")}
                  >
                    <MdOutlinePerson />
                    My Profile
                  </MenuItem>
                  <MenuItem
                    value="nar"
                    cursor={"pointer"}
                    py={2}
                    px={4}
                    onClick={() => navigate("/join-us")}
                  >
                    <MdElectricBolt />
                    NAR Page
                  </MenuItem>
                  <MenuItem
                    value="change-password"
                    cursor={"pointer"}
                    py={2}
                    px={4}
                    onClick={() => navigate("/user/change-password")}
                  >
                    <MdLockOpen />
                    Change Password
                  </MenuItem>
                  <MenuItem
                    value="logout"
                    cursor={"pointer"}
                    py={2}
                    px={4}
                    onClick={handleLogout}
                  >
                    <MdLogout />
                    Logout
                  </MenuItem>
                </MenuContent>
              </MenuRoot>
              <ColorModeButton rounded="full" />
              <Box display={{ base: "block", md: "none" }}>
                <MobileDrawer menuItems={menuItems} />
              </Box>
            </HStack>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
