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
import { PrevArrow, NextArrow } from "../../../components/CarouselArrows";

interface TeachingHistoryProps {
  assistant: Assistant;
}

export default function TeachingHistorySection({
  assistant,
}: TeachingHistoryProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const teachingHistories: TeachingHistory[] =
    assistant.TeachingHistories || [];

  const handleTabChange = (tabValue: number) => {
    setCurrentSlide(tabValue);
  };

  const sliderSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: teachingHistories.length > 2 ? 3 : 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow currentSlide={currentSlide} />,
    nextArrow: (
      <NextArrow
        currentSlide={currentSlide}
        slideCount={teachingHistories.length}
      />
    ),
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: teachingHistories.length > 2 ? 2 : 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          afterChange: (current: number) => setCurrentSlide(current),
        },
      },
    ],
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    variableWidth: teachingHistories.length > 2 ? false : true,
  };

  return (
    <Box
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

      <Box p={7} pt={2}>
        {teachingHistories.length > 0 ? (
          <div className="slider-container">
            <Slider {...sliderSettings}>
              {teachingHistories.map((history, index) => (
                <div key={index} onClick={() => handleTabChange(index)}>
                  <Box
                    py={3}
                    px={8}
                    mx={"2px"}
                    borderWidth="1px"
                    borderRadius="full"
                    bg={currentSlide === index ? "blue.600" : "gray.100"}
                    color={currentSlide === index ? "white" : "blue.600"}
                    textAlign="center"
                    fontSize="sm"
                    fontWeight="semibold"
                    transition="background 0.3s ease, color 0.3s ease"
                    _hover={{
                      bg: currentSlide === index ? "blue.600" : "gray.200",
                    }}
                    cursor="pointer"
                  >
                    <Text>{history.PeriodTitle}</Text>
                  </Box>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <Text fontSize="md" color="gray.500" textAlign="center" py={8}>
            No teaching history available.
          </Text>
        )}

        <Flex wrap="wrap" gap={4} p={2}>
          {teachingHistories.length > 0 &&
          teachingHistories[currentSlide]?.Courses ? (
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
                    bg="gray.50"
                    shadow="xs"
                    cursor="pointer"
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
          ) : (
            <Box />
          )}
        </Flex>
      </Box>
    </Box>
  );
}
