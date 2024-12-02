import { Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SegmentedControl } from "../../../components/ui/segmented-control";
import { Gallery } from "../../../types/Gallery";
import GalleryCard from "./components/GalleryCard";
import { getAcceptedGalleries } from "../../../services/GalleryService";

export default function ManageGalleryPage() {
  const [value, setValue] = useState("Accepted");
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
      {value === "Accepted" && (
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={4} w="full">
          {galleries.map((item, index) => (
            <GalleryCard key={index} gallery={item} />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
}
