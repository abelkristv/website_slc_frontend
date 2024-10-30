import { VStack, Text, Flex, List } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Assistant } from "../../models/Assistant";
import {
  getAssistantData,
  getGenerations,
} from "../../services/AssistantService";
import { EmptyState } from "../../components/ui/empty-state";
import { GoPeople } from "react-icons/go";
import AssistantFilters from "./components/AssistantFilters";
import AssistantPagination from "./components/AssistantPagination";
import AssistantGrid from "./components/AssistantGrid";

export default function AssistantPage() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [generations, setGenerations] = useState<string[]>([]);
  const [generation, setGeneration] = useState<string>("");
  const [orderby, setOrderby] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [count, setCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    setLoading(true);
    const name = searchInputRef.current?.value || "";
    const data = await getAssistantData(
      generation,
      name,
      orderby,
      status,
      page.toString()
    );

    setAssistants(data.users);
    setCount(data.total_count);
    setLoading(false);
  };

  useEffect(() => {
    const fetchGenerations = async () => {
      const data = await getGenerations();
      setGenerations(data);
    };

    fetchGenerations();

    const searchElement = searchInputRef.current;
    searchElement?.addEventListener("input", fetchData);

    return () => {
      searchElement?.removeEventListener("input", fetchData);
    };
  }, []);

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [generation, orderby, status, page]);

  useEffect(() => {
    setPage(1);
  }, [generation, orderby, status]);

  return (
    <VStack gap={4}>
      <Text
        fontSize="4xl"
        fontWeight="bold"
        color="white"
        textShadow="1px 1px 2px rgba(0, 0, 0, 0.4)"
      >
        Our Assistants
      </Text>

      <Flex direction="column" alignItems="start" gap={4} width="100%">
        <AssistantFilters
          searchInputRef={searchInputRef}
          setStatus={setStatus}
          setGeneration={setGeneration}
          setOrderby={setOrderby}
          generations={generations}
        />
      </Flex>

      <AssistantGrid assistants={assistants} loading={loading} />

      {!loading && assistants.length === 0 ? (
        <EmptyState
          icon={<GoPeople />}
          title="No assistants found"
          description="Try adjusting your search"
          bg={"white"}
          borderRadius={"md"}
          py={8}
          mt={-4}
        >
          <List.Root variant="marker">
            <List.Item>Try removing filters</List.Item>
            <List.Item>Try different keywords</List.Item>
          </List.Root>
        </EmptyState>
      ) : (
        assistants.length > 0 && (
          <AssistantPagination count={count} page={page} setPage={setPage} />
        )
      )}
    </VStack>
  );
}
