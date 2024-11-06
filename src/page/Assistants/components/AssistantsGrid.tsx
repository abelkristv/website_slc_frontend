import { SimpleGrid, Box, VStack, Skeleton, Badge } from "@chakra-ui/react";
import { Assistant } from "../../../types/Assistant";
import AssistantCard from "./AssistantsCard";
import { SkeletonCircle } from "../../../components/ui/skeleton";

interface AssistantsGridProps {
  assistants: Assistant[];
  loading: boolean;
}

export default function AssistantsGrid({
  assistants,
  loading,
}: AssistantsGridProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={4} w={"full"}>
      {loading
        ? Array.from({ length: 12 }).map((_, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="sm"
              bg="primary"
              p={6}
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="full"
              height="full"
            >
              <VStack gap={3} align="center">
                <SkeletonCircle size="80px" />
                <VStack gap={2} textAlign="center">
                  <Skeleton height="20px" width="60%" />
                  <Badge fontSize="xs" py={1} px={3}>
                    <Skeleton height="10px" width="40px" />
                  </Badge>
                  <VStack gap={1}>
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
  );
}
