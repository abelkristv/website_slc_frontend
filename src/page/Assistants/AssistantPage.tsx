import {
  VStack,
  Text,
  SimpleGrid,
  Box,
  Skeleton,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Assistant } from "../../models/Assistant";
import { getAssistantData } from "../../services/AssistantService";
import AssistantCard from "./components/AssistantCard";
import { SkeletonCircle } from "../../components/ui/skeleton";

export default function AssistantPage() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAssistantData();
      setAssistants(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <VStack gap={4}>
        <Text
          fontSize="4xl"
          fontWeight="bold"
          color="white"
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.6)"
        >
          Our Assistants
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={4}>
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <Box
                  key={index}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="md"
                  p={4}
                  bg="white"
                  width={64}
                  height={64}
                >
                  <VStack gap={3}>
                    <SkeletonCircle size="80px" />
                    <VStack gap={2} textAlign="center">
                      <Skeleton height="20px" width="60%" />
                      <Badge colorScheme="purple" fontSize="xs" py={1} px={3}>
                        <Skeleton height="10px" width="40px" />
                      </Badge>
                      <VStack gap={1} textAlign="center">
                        <Skeleton height="14px" width="50%" />
                        <Skeleton height="14px" width="50%" />
                      </VStack>
                    </VStack>
                  </VStack>
                </Box>
              ))
            : assistants.map((assistant) => (
                <AssistantCard key={assistant.ID} assistant={assistant} />
              ))}
        </SimpleGrid>
      </VStack>
    </div>
  );
}
