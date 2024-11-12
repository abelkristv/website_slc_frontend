import {
  Badge,
  Box,
  Flex,
  HStack,
  Image,
  List,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from "../../../components/ui/timeline";
import { Assistant } from "../../../types/Assistant";
import { formatCareerDate } from "../../../utils/dateUtils";
import { Button } from "../../../components/ui/button";
import { showErrorToast, showSuccessToast } from "../../../utils/toastUtils";
import { useState } from "react";
import { syncLinkedin } from "../../../services/SocialMediaService";
import { SyncLinkedin } from "../../../types/SyncLinkedin";
import { useUser } from "../../../contexts/UserContext";
import { AssistantExperience } from "../../../types/AssistantExperience";

interface ExperiencesProps {
  assistant: Assistant;
}

export default function ExperiencesSection({ assistant }: ExperiencesProps) {
  const assistantExperiences: AssistantExperience[] =
    assistant.AssistantExperiences || [];

  const [isLoading, setIsLoading] = useState(false);
  const { getCurrentUser } = useUser();

  const handleSyncLinkedin = async () => {
    const sync: SyncLinkedin = {
      AssistantId: assistant.ID.toString() || "",
      Link: assistant.SocialMedia.LinkedInLink || "",
    };
    setIsLoading(true);

    try {
      await syncLinkedin(sync);
      await getCurrentUser();
      showSuccessToast("Linkedin synced successfully");
    } catch (error: any) {
      showErrorToast(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="primary"
      width="100%"
      p={8}
      pb={2}
    >
      <Flex justifyContent={"space-between"} alignItems={"start"} mb={4}>
        <Text fontSize="xl" fontWeight="bold" color="secondary">
          Experiences
        </Text>
        {assistant.SocialMedia.LinkedInLink ? (
          <Button
            type="button"
            onClick={handleSyncLinkedin}
            bg="bluejack.100"
            _hover={{ bg: "bluejack.200" }}
            size={"xs"}
            disabled={isLoading}
            px={4}
            color={"white"}
          >
            {isLoading ? (
              <Spinner
                borderWidth={"3px"}
                size={"sm"}
                animationDuration="1s"
                mr={1}
              />
            ) : (
              ""
            )}
            Sync with Linkedin
          </Button>
        ) : (
          <Badge
            width={"max-content"}
            py={2}
            px={4}
            size={"sm"}
            colorPalette={"red"}
          >
            Add your LinkedIn profile to sync
          </Badge>
        )}
      </Flex>

      {assistantExperiences.map((assistantExperience, index) =>
        assistantExperience.Experiences.length > 1 ? (
          <VStack alignItems={"start"} justifyContent={"start"} key={index}>
            <HStack>
              {" "}
              <Image
                width={10}
                src={`data:image/jpeg;base64,${assistantExperience.CompanyLogo}`}
              />
              <Text fontWeight="semibold" ml={2}>
                {assistantExperience.CompanyName}
              </Text>
            </HStack>
            <TimelineRoot size={"sm"}>
              {assistantExperience.Experiences.map((experience, index) => (
                <TimelineItem key={index} ml={3}>
                  <TimelineConnector bg={"bluejack.100"}>
                    <Box
                      width="9px"
                      height="9px"
                      borderRadius="full"
                      bg="primary"
                    />
                  </TimelineConnector>
                  <TimelineContent ml={3} mt={-1}>
                    <TimelineTitle
                      fontSize={"sm"}
                      fontWeight="semibold"
                      lineHeight={1.5}
                    >
                      {experience.PositionName}
                    </TimelineTitle>
                    <TimelineDescription>
                      {formatCareerDate(experience.StartDate)} -{" "}
                      {formatCareerDate(experience.EndDate)}
                    </TimelineDescription>
                    <Text fontSize="sm" whiteSpace="pre-line">
                      {assistantExperience.Experiences[0].PositionDescription}
                    </Text>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </TimelineRoot>
          </VStack>
        ) : (
          <VStack
            alignItems={"start"}
            justifyContent={"start"}
            key={index}
            mb={8}
          >
            <HStack alignItems={"start"} justifyContent={"start"}>
              {" "}
              <Image
                width={10}
                src={`data:image/jpeg;base64,${assistantExperience.CompanyLogo}`}
              />
              <VStack ml={2} alignItems={"start"} gap={0.5}>
                {" "}
                <Text fontWeight="semibold" lineHeight={1.5}>
                  {assistantExperience.Experiences[0].PositionName}
                </Text>{" "}
                <Text fontSize={"sm"}>{assistantExperience.CompanyName}</Text>
                <Text fontSize={"xs"} color={"secondary"}>
                  {" "}
                  {formatCareerDate(
                    assistantExperience.Experiences[0].StartDate
                  )}{" "}
                  -{" "}
                  {formatCareerDate(assistantExperience.Experiences[0].EndDate)}
                </Text>
                <Text fontSize="sm" whiteSpace="pre-line">
                  {assistantExperience.Experiences[0].PositionDescription}
                </Text>
              </VStack>
            </HStack>
          </VStack>
        )
      )}
    </Box>
  );
}
