import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Assistant } from "../../models/Assistant";
import { getAssistantById } from "../../services/AssistantService";
import { Box, Image, Text, VStack, Stack, Badge } from "@chakra-ui/react";

export default function AssistantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [assistant, setAssistant] = useState<Assistant | null>(null);

  useEffect(() => {
    if (id) {
      const fetchAssistant = async () => {
        const data = await getAssistantById(id);
        setAssistant(data);
      };
      fetchAssistant();
    }
  }, [id]);

  if (!assistant) {
    return (
      <Text fontSize="lg" color="gray.500">
        Loading...
      </Text>
    );
  }

  return (
    <VStack gap={6} align="center" width="full">
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        bg="white"
        width={{ base: "90%", md: "60%", lg: "50%" }}
        p={8}
        textAlign="center"
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
            <Text fontSize="3xl" fontWeight="bold" color="gray.700">
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
    </VStack>
  );
}
