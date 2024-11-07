import { useEffect, useState } from "react";
import { Assistant } from "../../types/Assistant";
import { Flex, Skeleton } from "@chakra-ui/react";
import ProfileSection from "./components/ProfileSection";
import TeachingHistorySection from "./components/TeachingHistorySection";
import AwardsSection from "./components/AwardsSection";
import { useUser } from "../../contexts/UserContext";
import ExperiencesSection from "./components/ExperiencesSection";

export default function MyProfilePage() {
  const [assistant, setAssistant] = useState<Assistant | null>(null);
  const { user } = useUser();

  useEffect(() => {
    setAssistant(user?.Assistant || null);
  }, [user]);

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
          <Skeleton height="85vh" borderRadius="md" />
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
        <ProfileSection assistant={assistant} />
      </Flex>

      <Flex
        width={{ base: "100%", lg: "68%" }}
        gap={4}
        flexDirection={"column"}
      >
        <ExperiencesSection assistant={assistant} />
        <TeachingHistorySection assistant={assistant} />
        <AwardsSection />
      </Flex>
    </Flex>
  );
}
