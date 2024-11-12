import { useEffect, useRef, useState } from "react";
import {
  Box,
  HStack,
  Image,
  Separator,
  Text,
  VStack,
  Button,
  Flex,
  Spinner,
  Badge,
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
import { calculateDuration, formatCareerDate } from "../../../utils/dateUtils";
import { AssistantExperience } from "../../../types/AssistantExperience";
import { useUser } from "../../../contexts/UserContext";
import { SyncLinkedin } from "../../../types/SyncLinkedin";
import { syncLinkedin } from "../../../services/SocialMediaService";
import { showErrorToast, showSuccessToast } from "../../../utils/toastUtils";

interface ExperiencesProps {
  assistant: Assistant;
  fetchAssistant: () => void;
}

export default function ExperiencesSection({
  assistant,
  fetchAssistant,
}: ExperiencesProps) {
  const assistantExperiences: AssistantExperience[] =
    assistant.AssistantExperiences || [];

  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const handleSyncLinkedin = async () => {
    const sync: SyncLinkedin = {
      AssistantId: assistant.ID.toString() || "",
      Link: assistant.SocialMedia.LinkedInLink || "",
    };
    setIsLoading(true);

    try {
      await syncLinkedin(sync);
      await fetchAssistant();
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
    >
      {assistant.ID === user?.Assistant.ID ? (
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
      ) : (
        <Text fontSize="xl" fontWeight="bold" color="secondary" mb={4}>
          Experiences
        </Text>
      )}

      {assistantExperiences.map((assistantExperience, index) => {
        const locations = assistantExperience.Experiences.map(
          (exp) => exp.Location
        );
        const allLocationsSame = locations.every(
          (location) => location === locations[0]
        );

        return (
          <VStack alignItems="start" justifyContent="start" key={index}>
            <HStack alignItems="start" justifyContent="start">
              <Image
                width={10}
                src={`data:image/jpeg;base64,${assistantExperience.CompanyLogo}`}
              />
              <VStack
                ml={2}
                alignItems="start"
                justifyContent="start"
                gap={0.5}
              >
                <Text fontWeight="semibold" lineHeight={1.5}>
                  {assistantExperience.CompanyName}
                </Text>
                <Text fontSize="xs" color="secondary" mt={-0.5}>
                  {calculateDuration(
                    assistantExperience.Experiences[
                      assistantExperience.Experiences.length - 1
                    ].StartDate,
                    assistantExperience.Experiences[0].EndDate
                  )}
                </Text>
                <Text fontSize="xs" color="secondary">
                  {allLocationsSame && (
                    <span>{assistantExperience.Experiences[0].Location}</span>
                  )}
                </Text>
              </VStack>
            </HStack>

            <TimelineRoot size="sm" mt={2} ml={1.5}>
              {assistantExperience.Experiences.map((experience, index) => (
                <TimelineItem key={index} ml={3}>
                  <TimelineConnector bg="bluejack.100" width={3} height={3}>
                    <Box
                      borderRadius="full"
                      bg="card"
                      width={1.5}
                      height={1.5}
                    />
                  </TimelineConnector>
                  <TimelineContent ml={3} mt="-5px">
                    <TimelineTitle
                      fontSize="sm"
                      fontWeight="semibold"
                      lineHeight={1.5}
                    >
                      {experience.PositionName}
                    </TimelineTitle>
                    <TimelineDescription mt={-1} display="flex" gap={1}>
                      <span>{formatCareerDate(experience.StartDate)}</span>-{" "}
                      <span>{formatCareerDate(experience.EndDate)}</span> ·
                      <span>
                        {calculateDuration(
                          experience.StartDate,
                          experience.EndDate
                        )}
                      </span>
                    </TimelineDescription>
                    {!allLocationsSame && (
                      <Text fontSize="xs" color="secondary" mt={-1}>
                        {experience.Location}
                      </Text>
                    )}
                    {experience.PositionDescription &&
                    experience.PositionDescription.length >= 100 ? (
                      <CollapsibleDescription
                        description={experience.PositionDescription}
                      />
                    ) : (
                      experience.PositionDescription && (
                        <Text fontSize="sm" whiteSpace="pre-line">
                          {experience.PositionDescription}
                        </Text>
                      )
                    )}
                  </TimelineContent>
                </TimelineItem>
              ))}
            </TimelineRoot>

            {index !== assistantExperiences.length - 1 && (
              <Separator mt={-2} mb={5} />
            )}
          </VStack>
        );
      })}
    </Box>
  );
}

interface CollapsibleDescriptionProps {
  description: string;
}

function CollapsibleDescription({ description }: CollapsibleDescriptionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const previewHeight = 20;

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(
        isOpen ? contentRef.current.scrollHeight : previewHeight
      );
    }
  }, [isOpen, description]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Box mt={1}>
      <Box
        style={{
          height: `${contentHeight}px`,
          overflow: "hidden",
          transition: "height 0.2s ease",
        }}
      >
        <Box ref={contentRef}>
          <Text fontSize="sm" whiteSpace="pre-line">
            {description}
          </Text>
        </Box>
      </Box>
      {description.length > previewHeight && (
        <Button
          size="sm"
          variant="plain"
          onClick={toggleOpen}
          p={0}
          mt={1}
          color="bluejack.100"
          _hover={{ color: "bluejack.200", textDecoration: "underline" }}
          textAlign={"right"}
          mb={-2}
        >
          {isOpen ? "See less" : "See more"}
        </Button>
      )}
    </Box>
  );
}
