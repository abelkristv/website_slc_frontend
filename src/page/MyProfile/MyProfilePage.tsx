import { useEffect, useState } from "react";
import { Assistant } from "../../types/Assistant";
import { Text, Flex } from "@chakra-ui/react";
import ProfileSection from "./components/ProfileSection";
import CareerJourneySection from "./components/CareerJourneySection";
import TeachingHistorySection from "./components/TeachingHistorySection";
import AwardsSection from "./components/AwardsSection";
import { useUser } from "../../contexts/UserContext";

export default function MyProfilePage() {
  const [assistant, setAssistant] = useState<Assistant | null>(null);
  const { user } = useUser();

  useEffect(() => {
    setAssistant(user?.Assistant || null);
  }, [user]);

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
        <CareerJourneySection assistant={assistant} />
        <TeachingHistorySection assistant={assistant} />
        <AwardsSection />
      </Flex>
    </Flex>
  );
}
