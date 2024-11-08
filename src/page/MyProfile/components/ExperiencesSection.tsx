import { Badge, Box, Flex, Spinner, Text } from "@chakra-ui/react";
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
import { Position } from "../../../types/Position";
import { Button } from "../../../components/ui/button";
import { showErrorToast, showSuccessToast } from "../../../utils/toastUtils";
import { useState } from "react";
import { syncLinkedin } from "../../../services/SocialMediaService";
import { SyncLinkedin } from "../../../types/SyncLinkedin";
import { useUser } from "../../../contexts/UserContext";

interface ExperiencesProps {
  assistant: Assistant;
}

export default function ExperiencesSection({ assistant }: ExperiencesProps) {
  const positions: Position[] = assistant.Positions || [];
  if (positions.length === 0) {
    return null;
  }

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

      <TimelineRoot>
        {positions.map((position, index) => (
          <TimelineItem key={index}>
            <TimelineConnector bg={"bluejack.100"}>
              <Box
                width="12px"
                height="12px"
                borderRadius="full"
                bg="primary"
              />
            </TimelineConnector>
            <TimelineContent>
              <TimelineTitle
                fontWeight="bold"
                color={
                  /binus|bina nusantara|bank central asia/i.test(
                    position.PositionName
                  ) &&
                  /assistant|subject|administrator|operation|ppti/i.test(
                    position.PositionDescription
                  )
                    ? "bluejack.100"
                    : undefined
                }
              >
                {position.PositionDescription}
              </TimelineTitle>
              <TimelineDescription>
                {formatCareerDate(position.StartDate)} -{" "}
                {formatCareerDate(position.EndDate)}
              </TimelineDescription>
              <Text fontSize="sm" color="gray.500">
                {position.PositionName}
              </Text>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineRoot>
    </Box>
  );
}
