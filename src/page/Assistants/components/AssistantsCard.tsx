import { Box, Image, Text, VStack, Badge } from "@chakra-ui/react";
import { Assistant } from "../../../types/Assistant";
import { Link } from "react-router-dom";

interface AssistantsCardProps {
  assistant: Assistant;
}

export default function AssistantsCard({ assistant }: AssistantsCardProps) {
  return (
    <Link to={`/assistants/${assistant.ID}`}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="sm"
        bg="primary"
        _hover={{ transform: "scale(1.04)" }}
        cursor="pointer"
        width={"full"}
        height={"full"}
        py={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition="transform 0.2s"
      >
        <VStack gap={3} justifyContent="center">
          <Image
            src={assistant.ProfilePicture}
            alt={`${assistant.Initial} profile`}
            borderRadius="full"
            boxSize="80px"
            objectFit="cover"
            boxShadow="lg"
          />
          <VStack gap={2} textAlign="center">
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="secondary"
              maxHeight={16}
              width={60}
              truncate
            >
              {assistant.FullName}
            </Text>
            <Badge
              fontSize="xs"
              py={1}
              px={3}
              bg={{ base: "gray.200", _dark: "gray.800" }}
            >
              {assistant.Initial} {assistant.Generation}
            </Badge>
            <Box textAlign="center">
              {assistant.Status == "active" ? (
                <Badge variant={"plain"} color={"bluejack.200"} size={"md"}>
                  {assistant.SLCPosition.PositionName != ""
                    ? assistant.SLCPosition.PositionName
                    : "Laboratory Assistant"}
                </Badge>
              ) : (
                <Badge variant={"plain"} colorPalette="red" size={"md"}>
                  Inactive
                </Badge>
              )}
            </Box>
          </VStack>
        </VStack>
      </Box>
    </Link>
  );
}
