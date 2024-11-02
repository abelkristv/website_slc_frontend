import { Box, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { TeachingHistory } from "../../../models/TeachingHistory";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../../../components/ui/accordion";
import Slider from "react-slick";
import { Assistant } from "../../../models/Assistant";
import { getSliderSettings } from "./CarouselComponents";

interface TeachingHistoryProps {
  assistant: Assistant;
}

export default function TeachingHistorySection({
  assistant,
}: TeachingHistoryProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const teachingHistories: TeachingHistory[] =
    assistant.TeachingHistories || [];

  if (teachingHistories.length === 0) {
    return null;
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="primary"
      width="100%"
    >
      <Text fontSize="xl" fontWeight="bold" color="secondary" mx={8} mt={8}>
        Teaching History
      </Text>

      <Box p={7} pt={3}>
        <div className="slider-container">
          <Slider
            {...getSliderSettings(
              teachingHistories,
              currentSlide,
              setCurrentSlide
            )}
          >
            {teachingHistories.map((history, index) => (
              <div key={index} onClick={() => setCurrentSlide(index)}>
                <Box
                  py={3}
                  px={8}
                  mx={"2px"}
                  borderWidth="1px"
                  borderRadius="full"
                  bg={currentSlide === index ? "bluejack.100" : "card"}
                  color={currentSlide === index ? "primary" : "bluejack.100"}
                  textAlign="center"
                  fontSize="sm"
                  fontWeight="semibold"
                  transition="background 0.3s ease, color 0.3s ease"
                  _hover={{
                    bg: currentSlide === index ? "bluejack.100" : "card-hover",
                  }}
                  cursor="pointer"
                >
                  <Text>{history.PeriodTitle}</Text>
                </Box>
              </div>
            ))}
          </Slider>
        </div>

        <Flex wrap="wrap" gap={4} p={2}>
          <AccordionRoot multiple>
            {teachingHistories[currentSlide].Courses.map((course, index) => (
              <AccordionItem
                key={index}
                value={`${course.CourseCode}${index}`}
                mt={2}
                border="none"
              >
                <AccordionItemTrigger
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  bg="card"
                  shadow="xs"
                  cursor="pointer"
                >
                  <Box minWidth="100%">
                    <Text fontSize="md" fontWeight="bold" color="secondary">
                      {course.CourseCode}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {course.CourseTitle}
                    </Text>
                  </Box>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <Text
                    fontSize="sm"
                    color="gray.500"
                    p={4}
                    pt={2}
                    pb={0}
                    dangerouslySetInnerHTML={{
                      __html: course.CourseDescription,
                    }}
                  />
                </AccordionItemContent>
              </AccordionItem>
            ))}
          </AccordionRoot>
        </Flex>
      </Box>
    </Box>
  );
}
