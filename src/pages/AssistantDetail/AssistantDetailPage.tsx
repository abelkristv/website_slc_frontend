import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Assistant } from "../../types/Assistant";
import { getAssistantById } from "../../services/AssistantService";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
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
    setAssistant(null);
    fetchAssistant();
  }, [id]);

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
        <AwardsSection assistant={assistant} />
        {!assistant.AssistantExperiences?.length &&
          !assistant.Awards?.length &&
          !assistant.TeachingHistories?.length && (
            <Box
              bg="primary"
              p={8}
              borderRadius="lg"
              boxShadow="lg"
              textAlign="center"
            >
              <Heading
                as="h1"
                size="lg"
                color={{ base: "gray.900", _dark: "gray.200" }}
                mb={4}
              >
                No Data Available
              </Heading>
              <Text
                fontSize="lg"
                color={{ base: "gray.700", _dark: "gray.400" }}
                mb={2}
              >
                It seems there is no information to display for this assistant
                at the moment.
              </Text>
              <Text color="gray.500" fontStyle="italic">
                Please check back later.
              </Text>
            </Box>
          )}
      </Flex>
    </Flex>
  );
}
