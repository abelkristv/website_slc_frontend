import { Box, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SegmentedControl } from "../../../components/ui/segmented-control";
import { Gallery } from "../../../types/Gallery";
import GalleryCard from "./components/GalleryCard";
import {
  getAcceptedGalleries,
  getPendingGalleries,
} from "../../../services/GalleryService";
import { Skeleton } from "../../../components/ui/skeleton";
import PendingGalleryCard from "./components/PendingGalleryCard";

export default function ManageGalleryPage() {
  const [value, setValue] = useState("Accepted");
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [acceptedGalleries, setAcceptedGalleries] = useState<Gallery[]>([]);
  const [pendingGalleries, setPendingGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const accepted = await getAcceptedGalleries();
      setAcceptedGalleries(accepted);
      const pending = await getPendingGalleries();
      setPendingGalleries(pending);
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (value === "Accepted") {
      setGalleries(acceptedGalleries);
    } else if (value === "Pending") {
      setGalleries(pendingGalleries);
    }
  }, [value, acceptedGalleries, pendingGalleries]);

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
          items={["Accepted", "Pending"]}
        />
      </Flex>
      {loading ? (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4} w="full">
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
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4} w="full">
          {galleries.map((item, index) =>
            value == "Accepted" ? (
              <GalleryCard key={index} gallery={item} />
            ) : (
              <PendingGalleryCard
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
