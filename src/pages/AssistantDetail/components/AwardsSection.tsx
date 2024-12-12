import { Box, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { Assistant } from "../../../types/Assistant";

interface AwardsProps {
  assistant: Assistant;
}

export default function AwardsSection({ assistant }: AwardsProps) {
  const awards = assistant.Awards || [];

  if (awards.length === 0) return null;

  return (
    <Box
      mb={8}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="primary"
      width="100%"
      p={8}
    >
      <Text fontSize="xl" fontWeight="bold" color="secondary" mb={4}>
        Awards
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={4}>
        {awards.map((award, idx) => (
          <Box
            position="relative"
            borderWidth="1px"
            borderRadius="lg"
            bg="card"
            shadow="xs"
            overflow="hidden"
            cursor="pointer"
            key={idx}
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="300px"
              bg="black"
              opacity="0"
              transition="opacity 0.3s ease"
              _hover={{ opacity: "0.2" }}
            />
            <VStack align="start" p={4} gap={1} position="relative" zIndex={1}>
              <Text fontSize="md" fontWeight="bold" color="secondary">
                {award.AwardTitle}
              </Text>
              <Text fontSize="sm" color="secondary">
                {award.Period}
              </Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
