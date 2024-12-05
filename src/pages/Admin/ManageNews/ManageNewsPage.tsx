import { VStack, Text, SimpleGrid, HStack, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getNews } from "../../../services/NewsService";
import { News } from "../../../types/News";
import { Skeleton } from "../../../components/ui/skeleton";
import AddNewsModal from "./components/AddNewsModal";
import AdminNewsCard from "./components/AdminNewsCard";

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
      <HStack
        justifyContent={{ base: "start", md: "center" }}
        width="full"
        position={"relative"}
      >
        <Text
          fontSize={{ base: "3xl", md: "4xl" }}
          fontWeight="bold"
          color="white"
          textShadow="1px 1px 1px rgba(30, 30, 30, 0.4)"
        >
          Manage News
        </Text>
        <AddNewsModal fetchData={fetchData} />
      </HStack>

      {loading ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4} w="full">
          {Array.from({ length: 6 }).map((_, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="sm"
              bg="primary"
              width="full"
              height="full"
              display="flex"
              flexDirection="column"
            >
              <Skeleton height="auto" width="100%" aspectRatio={1 / 1} />
              <Box px={4} pt={3} pb={2}>
                <Skeleton height="20px" width="70%" mb={2} />
                <Skeleton height="14px" width="50%" />
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4} w="full">
          {news.map((item, index) => (
            <AdminNewsCard key={index} news={item} fetchNews={fetchData} />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
}
