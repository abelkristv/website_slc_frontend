import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Assistant } from "../../models/Assistant";
import { getAssistantById } from "../../services/AssistantService";
import { Text, Flex } from "@chakra-ui/react";
import CareerJourneySection from "./components/CareerJourneySection";
import TeachingHistorySection from "./components/TeachingHistorySection";
import AwardsSection from "./components/AwardsSection";
import ProfileSection from "./components/ProfileSection";

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
      direction={{ base: "column", lg: "row" }}
      gap={4}
      alignItems="start"
      width="full"
    >
      <Flex
        width={{ base: "100%", lg: "30%" }}
        gap={4}
        flexDirection={"column"}
      >
        <ProfileSection assistant={assistant} />
      </Flex>

      <Flex
        width={{ base: "100%", lg: "68%" }}
        gap={4}
        flexDirection={"column"}
      >
        <CareerJourneySection />
        <TeachingHistorySection assistant={assistant} />
        <AwardsSection />
      </Flex>
    </Flex>
  );
}
