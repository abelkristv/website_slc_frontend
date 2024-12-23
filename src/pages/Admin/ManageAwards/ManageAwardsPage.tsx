import { VStack, Text, HStack, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getAwards } from "../../../services/AwardService";
import AddAwardsModal from "./components/AddAwardsModal";
import Slider from "react-slick";
import {
  AwardNextArrow,
  AwardPrevArrow,
} from "../../../components/CarouselArrow";
import { AwardPeriod } from "../../../types/AwardPeriod";
import { Award } from "../../../types/Award";
import AwardCard from "../../Awards/components/AwardCard";

export default function ManageAwardsPage() {
  const [awardPeriods, setAwardPeriods] = useState<AwardPeriod[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [awards, setAwards] = useState<Award[]>([]);

  const sliderSettings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <AwardPrevArrow />,
    nextArrow: <AwardNextArrow />,
  };

  const fetchData = async () => {
    try {
      const data = await getAwards();
      const filteredData = data
        .filter(
          (awardPeriod) => awardPeriod.Awards && awardPeriod.Awards.length > 0
        )
        .reverse();

      setAwardPeriods(filteredData);
      if (filteredData.length > 0) {
        const initialPeriod = filteredData[0].PeriodTitle;
        setSelectedPeriod(initialPeriod);
        const selectedPeriod = filteredData.find(
          (awardPeriod) => awardPeriod.PeriodTitle === initialPeriod
        );
        setAwards(selectedPeriod?.Awards || []);
      }
    } catch (error) {
      console.error("Failed to fetch awards:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedPeriod) {
      const selectedPeriodData = awardPeriods.find(
        (awardPeriod) => awardPeriod.PeriodTitle === selectedPeriod
      );
      setAwards(selectedPeriodData?.Awards || []);
    }
  }, [selectedPeriod, awardPeriods]);

  return (
    <VStack gap={4}>
      {/* Header Section */}
      <HStack
        justifyContent={{ base: "space-between", md: "center" }}
        width="full"
        position="relative"
        px={4}
      >
        <Text
          fontSize={{ base: "3xl", md: "4xl" }}
          fontWeight="bold"
          color="white"
          textShadow="1px 1px 1px rgba(30, 30, 30, 0.4)"
        >
          Manage Awards
        </Text>
        <AddAwardsModal fetchData={fetchData} />
      </HStack>

      {/* Slider Section */}
      <div className="slider-container" style={{ width: "96%" }}>
        <Slider {...sliderSettings}>
          {awardPeriods.map((awardPeriod, index) => (
            <Box
              key={index}
              onClick={() => setSelectedPeriod(awardPeriod.PeriodTitle)}
              w={"100%"}
              display={"flex"}
            >
              <Box
                w={"99%"}
                py={2.5}
                px={4}
                borderWidth="1px"
                borderRadius="full"
                bg={
                  selectedPeriod === awardPeriod.PeriodTitle
                    ? "bluejack.100"
                    : "card"
                }
                color={
                  selectedPeriod === awardPeriod.PeriodTitle
                    ? "white"
                    : "bluejack.100"
                }
                textAlign="center"
                fontSize="sm"
                fontWeight="semibold"
                transition="background 0.3s ease, color 0.3s ease"
                _hover={{
                  bg:
                    selectedPeriod === awardPeriod.PeriodTitle
                      ? "bluejack.100"
                      : "card-hover",
                }}
                cursor="pointer"
              >
                <Text>{awardPeriod.PeriodTitle}</Text>
              </Box>
            </Box>
          ))}
        </Slider>
      </div>

      {/* Awards Display Section */}
      {awards.length > 0 && (
        <VStack gap={2} mt={4}>
          {awards.map((award, index) => (
            <VStack
              key={index}
              mb={4}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                fontSize="2xl"
                fontWeight="semibold"
                color="white"
                textShadow="1px 1px 1px rgba(30, 30, 30, 0.4)"
                textAlign={"center"}
              >
                {award.AwardTitle}
              </Text>
              <HStack
                flexWrap={"wrap"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={3}
              >
                {award.Assistants.map((assistant, assistantIndex) => (
                  <AwardCard key={assistantIndex} assistant={assistant} />
                ))}
              </HStack>
            </VStack>
          ))}
        </VStack>
      )}
    </VStack>
  );
}
