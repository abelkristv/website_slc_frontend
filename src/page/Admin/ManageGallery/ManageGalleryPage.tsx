import { Box, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SegmentedControl } from "../../../components/ui/segmented-control";
import { Gallery } from "../../../types/Gallery";
import GalleryCard from "../../../components/GalleryCard";
import { getAllGalleries } from "../../../services/GalleryService";
import { Skeleton } from "../../../components/ui/skeleton";
import AdminGalleryCard from "./components/AdminGalleryCard";

export default function ManageGalleryPage() {
  const [value, setValue] = useState("Accepted");
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const filteredGalleries = galleries.filter(
    (gallery) => gallery.GalleryStatus?.toLowerCase() === value.toLowerCase()
  );

  const fetchData = async () => {
    setLoading(true);
    try {
      const galleries = await getAllGalleries();
      setGalleries(galleries);
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
      <Text
        fontSize="4xl"
        fontWeight="bold"
        color="white"
        textShadow="1px 1px 1px rgba(30, 30, 30, 0.4)"
      >
        Manage Gallery
      </Text>
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
          {filteredGalleries.map((item, index) =>
            value == "Accepted" ? (
              <GalleryCard key={index} gallery={item} showStatus />
            ) : (
              <AdminGalleryCard
                key={index}
                gallery={item}
                fetchData={fetchData}
              />
            )
          )}
        </SimpleGrid>
      )}
    </VStack>
  );
}
