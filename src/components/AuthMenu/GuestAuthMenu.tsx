import { Box, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { FaUserPlus } from "react-icons/fa";
import { ColorModeButton, useColorModeValue } from "../ui/color-mode";
import { MdLogin } from "react-icons/md";
import GuestDrawer from "./drawers/GuestDrawer";

export default function GuestAuthMenu() {
  return (
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
          _hover={useColorModeValue({ bg: "blue.50" }, { bg: "gray.800" })}
        >
          <MdLogin />
          <Box as="span" ml={1}>
            Login
          </Box>
        </Button>
      </Link>
      <ColorModeButton rounded="full" ml={1} />
      <Box display={{ base: "block", md: "none" }}>
        <GuestDrawer />
      </Box>
    </HStack>
  );
}
