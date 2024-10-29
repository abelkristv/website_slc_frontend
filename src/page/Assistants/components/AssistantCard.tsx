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
      boxShadow="md"
      bg="white"
      maxW="sm"
      className="transition-transform transform hover:scale-105"
      cursor="pointer"
      width={64}
      height={64}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={3} justifyContent="center">
        <Image
          src={assistant.ProfilePicture}
          alt={`${assistant.Initial} profile`}
          borderRadius="full"
          boxSize="80px"
          objectFit="cover"
          className="shadow-lg"
        />
        <VStack spacing={2} textAlign="center">
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="gray.700"
            maxHeight={16}
            width={52}
            isTruncated
          >
            {assistant.FullName}
          </Text>
          <Badge colorScheme="purple" className="text-xs py-1 px-3">
            {assistant.Generation}
          </Badge>
          <VStack spacing={1} textAlign="center">
            <Text fontSize="sm" color="gray.600">
              Initial:{" "}
              <span className="font-semibold">{assistant.Initial}</span>
            </Text>
            <Text fontSize="sm" color="gray.600">
              Role: <span className="font-semibold">Assistant</span>
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
}
