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
      maxW="sm"
      _hover={{ transform: "scale(1.05)" }}
      cursor="pointer"
      width={64}
      height={64}
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
            fontSize="xl"
            fontWeight="bold"
            color="gray.700"
            maxHeight={16}
            width={52}
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
              Role: <span style={{ fontWeight: "600" }}>Assistant</span>
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
}
