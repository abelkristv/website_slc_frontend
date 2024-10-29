import {
  VStack,
  Text,
  SimpleGrid,
  Box,
  Skeleton,
  SkeletonCircle,
  Badge,
  Input,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Assistant } from "../../models/Assistant";
import { getAssistantData } from "../../services/AssistantService";
import AssistantCard from "./components/AssistantCard";
import {
  filterAssistants,
  getGenerations,
  sortAssistants,
} from "./utils/AssistantHelper";

export default function AssistantPage() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [generationFilter, setGenerationFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [generations, setGenerations] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAssistantData();
      setAssistants(data);
      setGenerations(getGenerations(data));
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.toLowerCase());
  };

  const handleGenerationFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenerationFilter(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const displayedAssistants = sortAssistants(
    filterAssistants(assistants, filter, generationFilter),
    sortOption
  );

  return (
    <div className="flex justify-center items-center">
      <VStack spacing={4}>
        <Text
          fontSize="4xl"
          fontWeight="bold"
          color="white"
          sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)" }}
        >
          Our Assistants
        </Text>

        <VStack spacing={2} width="100%">
          <Input
            placeholder="Search by name or initial"
            value={filter}
            onChange={handleSearch}
            bg="white"
            width="80%"
          />
          <Select
            placeholder="Filter by generation"
            onChange={handleGenerationFilter}
            bg="white"
            width="80%"
          >
            {generations.map((gen) => (
              <option key={gen} value={gen}>
                {gen}
              </option>
            ))}
          </Select>
          <Select
            placeholder="Sort by"
            onChange={handleSort}
            bg="white"
            width="80%"
          >
            <option value="FullName-asc">Name Ascending</option>
            <option value="FullName-desc">Name Descending</option>
            <option value="Initial-asc">Initial Ascending</option>
            <option value="Initial-desc">Initial Descending</option>
            <option value="Generation-asc">Generation Ascending</option>
            <option value="Generation-desc">Generation Descending</option>
          </Select>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={4}>
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
                  <VStack spacing={3}>
                    <SkeletonCircle size="80px" />
                    <VStack spacing={2} textAlign="center">
                      <Skeleton height="20px" width="60%" />
                      <Badge colorScheme="purple" fontSize="xs" py={1} px={3}>
                        <Skeleton height="10px" width="40px" />
                      </Badge>
                      <VStack spacing={1} textAlign="center">
                        <Skeleton height="14px" width="50%" />
                        <Skeleton height="14px" width="50%" />
                      </VStack>
                    </VStack>
                  </VStack>
                </Box>
              ))
            : displayedAssistants.map((assistant) => (
                <AssistantCard key={assistant.ID} assistant={assistant} />
              ))}
        </SimpleGrid>
      </VStack>
    </div>
  );
}
