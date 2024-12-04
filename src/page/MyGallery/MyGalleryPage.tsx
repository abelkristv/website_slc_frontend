import { Box, Flex, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getMyGalleries } from "../../services/GalleryService";
import { Gallery } from "../../types/Gallery";
import { SegmentedControl } from "../../components/ui/segmented-control";
import { Skeleton } from "../../components/ui/skeleton";
import AddGalleryModal from "./components/AddGalleryModal";
import MyGalleryCard from "./components/MyGalleryCard";

export default function MyGalleryPage() {
  const [value, setValue] = useState("Accepted");
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchedGalleries = await getMyGalleries();
      setGalleries(fetchedGalleries);
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredGalleries = galleries.filter(
    (gallery) => gallery.GalleryStatus?.toLowerCase() === value.toLowerCase()
  );

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
          My Gallery
        </Text>
        <AddGalleryModal fetchData={fetchData} />
      </HStack>
      <Flex width={"full"} justifyContent={"start"}>
        <SegmentedControl
          value={value}
          onValueChange={(e) => setValue(e.value)}
          items={["Accepted", "Pending", "Rejected"]}
        />
      </Flex>
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
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4} w="full">
          {filteredGalleries.map((item, index) => (
            <MyGalleryCard
              key={index}
              gallery={item}
              showStatus
              fetchData={fetchData}
            />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
}
