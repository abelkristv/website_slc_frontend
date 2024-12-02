import { HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Gallery } from "../../types/Gallery";
import { getAcceptedGalleries } from "../../services/GalleryService";
import GalleryCard from "./components/GalleryCard";
import AddGalleryModal from "./components/AddGalleryModal";

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAcceptedGalleries();
      setGalleries(data);
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
          Gallery
        </Text>
        <AddGalleryModal fetchData={fetchData} />
      </HStack>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        gapY={2}
        gapX={4}
        w="full"
      >
        {galleries.map((item, index) => (
          <GalleryCard key={index} gallery={item} />
        ))}
      </SimpleGrid>
    </VStack>
  );
}
