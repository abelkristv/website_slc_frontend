import { Box, Text } from "@chakra-ui/react";
import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from "../../../components/ui/timeline";
import { Assistant } from "../../../models/Assistant";

interface CareerJourneyProps {
  assistant: Assistant;
}

export default function CareerJourneySection({
  assistant,
}: CareerJourneyProps) {
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
      <Text fontSize="xl" fontWeight="bold" color="secondary" mb={4}>
        Career Journey
      </Text>
      <TimelineRoot>
        {assistant.Positions.reverse().map((position, index) => (
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
              <TimelineTitle fontWeight="bold">
                {position.PositionName}
              </TimelineTitle>
              <TimelineDescription>
                {position.StartDate} - {position.EndDate}
              </TimelineDescription>
              <Text fontSize="sm" color="gray.500">
                {position.PositionDescription}
              </Text>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineRoot>
    </Box>
  );
}
