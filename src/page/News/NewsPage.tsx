import { VStack, Text, SimpleGrid, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getNews } from "../../services/NewsService";
import { News } from "../../types/News";
import { formatDate } from "../../utils/dateUtils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsCard from "./components/NewsCard";
import Iframe from "react-iframe";

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getNews();
      setNews(data);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <VStack gap={4}>
      <Text
        fontSize="4xl"
        fontWeight="bold"
        color="white"
        textShadow="1px 1px 1px rgba(30, 30, 30, 0.4)"
      >
        News
      </Text>
      {loading ? (
        <Text color="gray.500">Loading...</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4} w="full">
          {news.map((item, index) => (
            <NewsCard
              key={index}
              title={item.NewsTitle || "Untitled"}
              date={formatDate(item.CreatedAt!) || "No Date"}
              description={item.NewsDescription || "No description available."}
              images={item.NewsImages}
            />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
}
