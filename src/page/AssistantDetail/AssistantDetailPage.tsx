import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Assistant } from "../../models/Assistant";
import { getAssistantById } from "../../services/AssistantService";
import { Box, Image, Text, VStack, Stack, Badge, Flex } from "@chakra-ui/react";
import CareerJourney from "./components/CareerJourney";
import TeachingHistory from "./components/TeachingHistory";
import Achievements from "./components/Achievements";

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
    <Flex
      direction={{ base: "column", lg: "row" }} // Change direction at lg breakpoint
      gap={4}
      alignItems="start"
      width="full"
    >
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        bg="white"
        width={{ base: "100%", lg: "30%" }} // Responsive width
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

      <Box width={{ base: "100%", lg: "68%" }}>
        <CareerJourney />
        <TeachingHistory />
        <Achievements />
      </Box>
    </Flex>
  );
}
