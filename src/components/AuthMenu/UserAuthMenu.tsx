import { Box, HStack, Text } from "@chakra-ui/react";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";
import { useColorMode, useColorModeValue } from "../ui/color-mode";
import { Avatar } from "../ui/avatar";
import {
  MdElectricBolt,
  MdKeyboardArrowDown,
  MdLockOpen,
  MdLogout,
  MdOutlineColorLens,
  MdOutlinePerson,
  MdOutlinePhoto,
} from "react-icons/md";
import { useUser } from "../../contexts/UserContext";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { useNavigate } from "react-router";
import UserDrawer from "./drawers/UserDrawer";
import AdminMenu from "./AdminMenu";

export default function UserAuthMenu() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const { toggleColorMode } = useColorMode();

  const handleLogout = async () => {
    try {
      await logout();
      showSuccessToast("Logout successful");
      navigate("/");
    } catch (err: any) {
      const errorMessage = err.response?.data.message || "Logout failed";
      showErrorToast(errorMessage);
    }
  };

  if (user) {
    return (
      <HStack gap={{ base: 0, sm: 4 }}>
        <MenuRoot positioning={{ placement: "bottom-end" }}>
          <MenuTrigger outline={"none"} border={"none"} cursor={"pointer"}>
            <Box
              px={{ base: 0, lg: 4 }}
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
                <Text
                  fontSize={"md"}
                  fontWeight={"medium"}
                  display={{ base: "none", sm: "flex" }}
                >
                  {user.Assistant.Initial} {user.Assistant.Generation}
                </Text>
                <Box display={"flex"}>
                  <MdKeyboardArrowDown />
                </Box>
              </HStack>
            </Box>
          </MenuTrigger>
          <MenuContent p={0} width={"44"}>
            <MenuItem
              value="profile"
              cursor={"pointer"}
              py={2}
              px={4}
              onClick={() => navigate(`/assistants/${user.Assistant.ID}`)}
            >
              <MdOutlinePerson />
              My Profile
            </MenuItem>
            <MenuItem
              value="gallery"
              cursor={"pointer"}
              py={2}
              px={4}
              onClick={() => navigate(`/my-gallery`)}
            >
              <MdOutlinePhoto />
              My Gallery
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
              value="toggle"
              cursor={"pointer"}
              py={2}
              px={4}
              onClick={toggleColorMode}
            >
              <MdOutlineColorLens />
              Toggle Theme
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
            {user.Username === "DT23-2" && <AdminMenu />}
          </MenuContent>
        </MenuRoot>
        <Box display={{ base: "block", lg: "none" }}>
          <UserDrawer />
        </Box>
      </HStack>
    );
  }
}
