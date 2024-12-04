import { Box, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Gallery } from "../../types/Gallery";
import { getAcceptedGalleries } from "../../services/GalleryService";
import { Skeleton } from "../../components/ui/skeleton";
import GalleryCard from "../../components/GalleryCard";

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAcceptedGalleries();
      setGalleries(data);
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <VStack gap={4}>
      <HStack justifyContent={"center"} width="full" position={"relative"}>
        <Text
          fontSize={"4xl"}
          fontWeight="bold"
          color="white"
          textShadow="1px 1px 1px rgba(30, 30, 30, 0.4)"
        >
          Gallery
        </Text>
      </HStack>
      {loading ? (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4} w="full">
          {Array.from({ length: 8 }).map((_, index) => (
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
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          gapY={2}
          gapX={4}
          w="full"
        >
          {galleries.map((item, index) => (
            <GalleryCard
              key={index}
              gallery={item}
              delay={Math.random() * 2000}
              vertical={Math.random() > 0.5}
              rtl={Math.random() > 0.5}
            />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
}
