import { Box, Text } from "@chakra-ui/react";
import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from "../../../components/ui/timeline";

export default function CareerJourneySection() {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="primary"
      width="100%"
      p={8}
      pb={4}
    >
      <Text fontSize="xl" fontWeight="bold" color="secondary" mb={4}>
        Career Journey
      </Text>
      <TimelineRoot>
        <TimelineItem>
          <TimelineConnector bg={"bluejack.100"}>
            <Box width="12px" height="12px" borderRadius="full" bg="primary" />
          </TimelineConnector>
          <TimelineContent>
            <TimelineTitle fontWeight="bold">
              Laboratory Assistant
            </TimelineTitle>
            <TimelineDescription>
              1 September 2023 - 9 September 2024
            </TimelineDescription>
            <Text fontSize="sm" color="gray.500">
              Assisted in various laboratory experiments and maintained
              equipment.
            </Text>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineConnector bg={"bluejack.100"}>
            <Box width="12px" height="12px" borderRadius="full" bg="primary" />
          </TimelineConnector>
          <TimelineContent>
            <TimelineTitle fontWeight="bold">Subject Coordinator</TimelineTitle>
            <TimelineDescription>
              10 September 2024 - 15 September 2025
            </TimelineDescription>
            <Text fontSize="sm" color="gray.500">
              Coordinated subjects for laboratory sessions and managed student
              assignments.
            </Text>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineConnector bg={"bluejack.100"}>
            <Box width="12px" height="12px" borderRadius="full" bg="primary" />
          </TimelineConnector>
          <TimelineContent>
            <TimelineTitle fontWeight="bold">
              Subject Development Officer
            </TimelineTitle>
            <TimelineDescription>
              10 September 2024 - 15 September 2025
            </TimelineDescription>
            <Text fontSize="sm" color="gray.500">
              Coordinated subjects for laboratory sessions and managed student
              assignments.
            </Text>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineConnector bg={"bluejack.100"}>
            <Box width="12px" height="12px" borderRadius="full" bg="primary" />
          </TimelineConnector>
          <TimelineContent>
            <TimelineTitle fontWeight="bold">Deloitte</TimelineTitle>
            <TimelineDescription>
              16 September 2025 - Present
            </TimelineDescription>
            <Text fontSize="sm" color="gray.500">
              Working as a Frontend Developer, focusing on web applications and
              user experience.
            </Text>
          </TimelineContent>
        </TimelineItem>
      </TimelineRoot>
    </Box>
  );
}
