import { VStack, Text, SimpleGrid, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getNews } from "../../../services/NewsService";
import { News } from "../../../types/News";
import NewsCard from "./components/NewsCard";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";

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
      <HStack justifyContent={"space-between"} width={"full"}>
        {" "}
        <Text
          fontSize={{ base: "3xl", md: "4xl" }}
          fontWeight="bold"
          color="white"
          textShadow="1px 1px 1px rgba(30, 30, 30, 0.4)"
        >
          Manage News
        </Text>
        <Link to={"/admin/add-news"}>
          <Button
            bg={"white"}
            _hover={{ bg: "gray.100" }}
            color={"black"}
            size={{ base: "sm", md: "md" }}
          >
            Add News
          </Button>
        </Link>
      </HStack>

      {loading ? (
        <Text color="gray.500">Loading...</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4} w="full">
          {news.map((item, index) => (
            <NewsCard key={index} news={item} fetchNews={fetchData} />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
}
