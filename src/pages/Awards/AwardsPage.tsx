import { VStack, Text, HStack, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AwardPeriod } from "../../types/AwardPeriod";
import { getAwards } from "../../services/AwardService";
import { Award } from "../../types/Award";
import AwardCard from "./components/AwardCard";
import Slider from "react-slick";
import { AwardNextArrow, AwardPrevArrow } from "../../components/CarouselArrow";

export default function AwardsPage() {
  const [awardPeriods, setAwardPeriods] = useState<AwardPeriod[]>([]);
  const [period, setPeriod] = useState<string>("");
  const [awards, setAwards] = useState<Award[]>([]);

  const settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <AwardPrevArrow />,
    nextArrow: <AwardNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
      setPeriod(filteredData[0].PeriodTitle);
    } catch (error) {
      console.error("Failed to fetch awards:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (period) {
      const selectedPeriod = awardPeriods.find(
        (awardPeriod) => awardPeriod.PeriodTitle === period
      );
      if (selectedPeriod) {
        setAwards(selectedPeriod.Awards || []);
      }
    }
  }, [period, awardPeriods]);

  return (
    <VStack gap={4}>
      <Text
        fontSize="4xl"
        fontWeight="bold"
        color="white"
        textShadow="1px 1px 1px rgba(30, 30, 30, 0.4)"
      >
        Awards
      </Text>
      <div className="slider-container" style={{ width: "96%" }}>
        <Slider {...settings}>
          {awardPeriods.map((awardPeriod, index) => (
            <Box
              key={index}
              onClick={() => setPeriod(awardPeriod.PeriodTitle)}
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
                  period === awardPeriod.PeriodTitle ? "bluejack.100" : "card"
                }
                color={
                  period === awardPeriod.PeriodTitle ? "white" : "bluejack.100"
                }
                textAlign="center"
                fontSize="sm"
                fontWeight="semibold"
                transition="background 0.3s ease, color 0.3s ease"
                _hover={{
                  bg:
                    period === awardPeriod.PeriodTitle
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
                {" "}
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
