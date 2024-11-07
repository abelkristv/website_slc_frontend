import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "../../ui/drawer";
import { HStack, Image, Text, Button } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import binus from "../../../assets/binus.png";
import binus_dark from "../../../assets/binus_dark.png";
import ribbon from "../../../assets/ribbon.png";
import { useColorModeValue } from "../../ui/color-mode";
import { menuLinks } from "../../data/menuLinks";

export default function GuestDrawer() {
  const location = useLocation();

  return (
    <DrawerRoot placement={"end"}>
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
          <DrawerActionTrigger w={"full"} overflowX={"hidden"}>
            {menuLinks.map((item) => (
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
            <Link to={"/join-us"}>
              <Text
                color={
                  location.pathname === "/join-us"
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
                Join Us
              </Text>
            </Link>
            <Link to="/login">
              <Text
                color={
                  location.pathname === "/login" ? "bluejack.100" : "secondary"
                }
                w="full"
                mt={2}
                mb={6}
                ml={10}
                textAlign={"left"}
                fontSize={"md"}
                fontWeight={"semibold"}
              >
                Login
              </Text>
            </Link>
          </DrawerActionTrigger>
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
}
