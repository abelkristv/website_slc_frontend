import { Box, Text, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAssistantTeachingHistory } from "../../../services/TeachingHistoryService";
import { TeachingHistory } from "../../../models/TeachingHistory";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../../../components/ui/accordion";

interface TeachingHistoryProps {
  username: string;
}

export default function TeachingHistorySection({
  username,
}: TeachingHistoryProps) {
  const [value, setValue] = useState<number>(0);
  const [teachingHistories, setTeachingHistories] = useState<TeachingHistory[]>(
    []
  );

  useEffect(() => {
    const fetchTeachingHistories = async () => {
      const data = await getAssistantTeachingHistory(username);
      setTeachingHistories(data || []);
    };
    fetchTeachingHistories();
  }, [username]);

  const handleTabChange = (tabValue: number) => {
    setValue(tabValue);
  };

  return (
    <Box
      mb={4}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      width="100%"
    >
      <Text fontSize="xl" fontWeight="bold" color="gray.800" mx={8} mt={8}>
        Teaching History
      </Text>

      <Box p={8} pt={4}>
        <Flex
          mb={4}
          gap={2}
          direction={{ base: "column", md: "row" }}
          overflowX={{ base: "hidden", md: "auto" }}
        >
          {teachingHistories.length ? (
            teachingHistories.map((history, index) => (
              <Box
                key={index}
                minWidth="8rem"
                p={3}
                cursor="pointer"
                onClick={() => handleTabChange(index)}
                borderWidth="1px"
                borderRadius="full"
                bg={value === index ? "blue.600" : "gray.100"}
                color={value === index ? "white" : "blue.600"}
                textAlign="center"
                fontSize="sm"
                fontWeight="semibold"
                transition="background 0.3s ease, color 0.3s ease"
                _hover={{
                  bg: value === index ? "blue.600" : "gray.200",
                }}
              >
                {history.periodName}
              </Box>
            ))
          ) : (
            <Text fontSize="md" color="gray.500">
              No teaching history available.
            </Text>
          )}
        </Flex>

        <Flex wrap="wrap" gap={4}>
          {teachingHistories[value]?.courses ? (
            <AccordionRoot multiple>
              {teachingHistories[value].courses.map((course, index) => (
                <AccordionItem
                  key={index}
                  value={`course-${index}`}
                  mb={2}
                  border="none"
                >
                  <AccordionItemTrigger
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    bg="gray.50"
                    shadow="xs"
                    cursor={"pointer"}
                  >
                    <Box minWidth="100%">
                      <Text fontSize="md" fontWeight="bold" color="gray.700">
                        {course.CourseCode}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        {course.CourseTitle}
                      </Text>
                    </Box>
                  </AccordionItemTrigger>
                  <AccordionItemContent>
                    <Text fontSize="sm" color="gray.500" p={4}>
                      Additional information about {course.CourseTitle}.
                    </Text>
                  </AccordionItemContent>
                </AccordionItem>
              ))}
            </AccordionRoot>
          ) : (
            <Text fontSize="md" color="gray.500" mb={2}>
              No courses available.
            </Text>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
