import {
  VStack,
  Text,
  SimpleGrid,
  Box,
  Skeleton,
  Badge,
  HStack,
  Flex,
  createListCollection,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Assistant } from "../../models/Assistant";
import {
  getAssistantData,
  getGenerations,
} from "../../services/AssistantService";
import AssistantCard from "./components/AssistantCard";
import { SkeletonCircle } from "../../components/ui/skeleton";
import InputField from "../../components/InputField";
import { IoSearch } from "react-icons/io5";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../components/ui/select";

export default function AssistantPage() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);
  const [generations, setGenerations] = useState<string[]>([]);
  const [selectedGeneration, setSelectedGeneration] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchGenerations = async () => {
      const data = await getGenerations();
      setGenerations(data);
    };

    const fetchData = async () => {
      setLoading(true);
      const name = searchInputRef.current?.value || "";
      const data = await getAssistantData(
        selectedGeneration,
        name,
        orderBy,
        order
      );
      setAssistants(data);
      setLoading(false);
    };

    fetchGenerations();
    fetchData();
  }, [selectedGeneration, orderBy, order]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const searchTerm = searchInputRef.current?.value || "";
    console.log("Search Term:", searchTerm);
  };

  const generationCollection = createListCollection({
    items: generations.map((gen) => ({ label: gen, value: gen })),
  });

  const orderCollection = createListCollection({
    items: [
      { label: "Name", value: "name" },
      { label: "Generation", value: "generation" },
    ],
  });

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

        <HStack as="form" onSubmit={handleSubmit}>
          <InputField
            ref={searchInputRef}
            name="username"
            placeholder="Search"
            icon={<IoSearch color="gray.300" />}
          />
          <Flex justifyContent="space-between" gap="5" width="320px">
            <SelectRoot
              collection={generationCollection}
              variant="outline"
              outline="none"
              borderRadius="md"
              bgColor="white"
              width="full"
              shadow="xs"
              onValueChange={(value) => setSelectedGeneration(value as any)}
            >
              <SelectTrigger>
                <SelectValueText placeholder="All Generations" />
              </SelectTrigger>
              <SelectContent>
                {generationCollection.items.map((gen) => (
                  <SelectItem item={gen} key={gen.value}>
                    {gen.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            <SelectRoot
              collection={orderCollection}
              variant="outline"
              outline="none"
              borderRadius="md"
              bgColor="white"
              width="full"
              shadow="xs"
              onValueChange={(value) => setOrderBy(value as any)}
            >
              <SelectTrigger>
                <SelectValueText placeholder="Order By" />
              </SelectTrigger>
              <SelectContent>
                {orderCollection.items.map((item) => (
                  <SelectItem item={item} key={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Flex>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={4}>
          {loading
            ? Array.from({ length: 12 }).map((_, index) => (
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
