import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Assistant } from "../../types/Assistant";
import { getAssistantById } from "../../services/AssistantService";
import { Flex } from "@chakra-ui/react";
import TeachingHistorySection from "./components/TeachingHistorySection";
import AwardsSection from "./components/AwardsSection";
import ProfileSection from "./components/ProfileSection";
import ExperiencesSection from "./components/ExperiencesSection";
import { Skeleton } from "../../components/ui/skeleton";

export default function AssistantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [assistant, setAssistant] = useState<Assistant | null>(null);

  const fetchAssistant = async () => {
    if (id) {
      const data = await getAssistantById(id);
      setAssistant(data);
    }
  };

  useEffect(() => {
    fetchAssistant();
  }, []);

  if (!assistant) {
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
          flexDirection="column"
        >
          <Skeleton height="324px" borderRadius="md" />
        </Flex>

        <Flex
          width={{ base: "100%", lg: "68%" }}
          gap={4}
          flexDirection="column"
        >
          <Skeleton height="85vh" borderRadius="md" />
        </Flex>
      </Flex>
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
        <ProfileSection assistant={assistant} fetchAssistant={fetchAssistant} />
      </Flex>

      <Flex
        width={{ base: "100%", lg: "68%" }}
        gap={4}
        flexDirection={"column"}
      >
        <ExperiencesSection
          assistant={assistant}
          fetchAssistant={fetchAssistant}
        />
        <TeachingHistorySection assistant={assistant} />
        <AwardsSection />
      </Flex>
    </Flex>
  );
}
