import { Box, Image, Text, VStack, Badge } from "@chakra-ui/react";
import { Assistant } from "../../../models/Assistant";

interface AssistantCardProps {
  assistant: Assistant;
}

export default function AssistantCard({ assistant }: AssistantCardProps) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
      bg="white"
      _hover={{ transform: "scale(1.05)" }}
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
            color="gray.700"
            maxHeight={16}
            width={60}
            truncate
          >
            {assistant.FullName}
          </Text>
          <Badge colorScheme="purple" fontSize="xs" py={1} px={3}>
            {assistant.Generation}
          </Badge>
          <VStack gap={1} textAlign="center">
            <Text fontSize="sm" color="gray.600">
              Initial:{" "}
              <span style={{ fontWeight: "600" }}>{assistant.Initial}</span>
            </Text>
            <Text fontSize="sm" color="gray.600">
              Position:{" "}
              <span style={{ fontWeight: "600" }}>
                {assistant.Status == "active" ? "Assistant" : "Inactive"}
              </span>
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
}
