import { Box, Flex, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import { News } from "../../../../types/News";
import { formatDate } from "../../../../utils/dateUtils";
import UpdateNewsModal from "./UpdateNewsModal";
import DeleteNewsModal from "./DeleteNewsModal";

interface NewsCardProps {
  news: News;
  fetchNews: () => void;
}

export default function NewsCard({ news, fetchNews }: NewsCardProps) {
  const sliderSettings = {
    infinite: news.NewsImages.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: news.NewsImages.length > 1,
    autoplaySpeed: 5000,
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
      bg="primary"
      width="full"
      display="flex"
      flexDirection="column"
      justifyContent={"space-between"}
      position={"relative"}
    >
      <Box width="100%">
        <Slider {...sliderSettings}>
          {news.NewsImages.map((image, imgIndex) => (
            <Box key={imgIndex}>
              <img
                src={image}
                alt={`Slide ${imgIndex + 1}`}
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "1/1",
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>
      <Box px={4} pt={3} pb={2} mt={"-2"} zIndex={10} bg={"primary"}>
        <Flex direction="column" align="start" height="full">
          <Text
            fontWeight="bold"
            fontSize="lg"
            color="secondary"
            mb={2}
            lineClamp={"1"}
            textAlign={"left"}
          >
            {news.NewsTitle || "Untitled"}
          </Text>
          <Text fontSize="sm" color="gray.500" mb={2}>
            {formatDate(news.UpdatedAt!) || "No Date"}
          </Text>
        </Flex>
        <UpdateNewsModal news={news} fetchData={fetchNews} />
        <DeleteNewsModal newsId={news.ID!} fetchNews={fetchNews} />
      </Box>
    </Box>
  );
}
