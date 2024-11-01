import { Badge, Box, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { Assistant } from "../../../models/Assistant";

interface ProfileProps {
  assistant: Assistant;
}

export default function ProfileSection({ assistant }: ProfileProps) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      p={8}
    >
      <VStack gap={4}>
        <Image
          src={assistant.ProfilePicture}
          alt={`${assistant.Initial}'s profile`}
          boxSize="150px"
          rounded="full"
          objectFit="cover"
          boxShadow="lg"
        />
        <Stack align="center">
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="gray.700"
            textAlign={"center"}
          >
            {assistant.FullName}
          </Text>
          <Badge fontSize="md" py={1} px={4} colorScheme="blue">
            {assistant.Initial} {assistant.Generation}
          </Badge>
          <Text fontSize="md" color="gray.500" fontWeight={600}>
            {assistant.Status === "active"
              ? "Laboratory Assistant"
              : "Inactive"}
          </Text>
        </Stack>
      </VStack>
    </Box>
  );
}
