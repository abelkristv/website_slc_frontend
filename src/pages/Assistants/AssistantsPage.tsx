import { VStack, Text, Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Assistant } from "../../types/Assistant";
import {
  getAssistants,
  getGenerations,
  getSLCPositions,
} from "../../services/AssistantService";
import AssistantsFilters from "./components/AssistantsFilters";
import AssistantsGrid from "./components/AssistantsGrid";
import AssistantsNotFound from "./components/AssistantsNotFound";
import Pagination from "../../components/Pagination";
import { SLCPosition } from "../../types/SLCPosition";

export default function AssistantsPage() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [generations, setGenerations] = useState<string[]>([]);
  const [positions, setPositions] = useState<SLCPosition[]>([]);
  const [generation, setGeneration] = useState<string>("");
  const [orderby, setOrderby] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [count, setCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [itemsPerPage] = useState(24);
  const [isMounted, setIsMounted] = useState(false);
  const fetchDataTimeoutRef = useRef<number>(0);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = async () => {
    console.log("pos", position);
    setLoading(true);
    const data = await getAssistants(
      generation,
      searchTerm,
      orderby,
      status,
      page.toString(),
      position
    );
    setAssistants(data.users);
    setCount(data.total_count);
    setLoading(false);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (generation) params.set("generation", generation);
    if (orderby) params.set("orderby", orderby);
    if (status) params.set("status", status);
    if (searchTerm) params.set("search", searchTerm);
    if (position) params.set("position", position);
    params.set("page", page.toString());
    navigate(`?${params.toString()}`, { replace: true });
  }, [generation, orderby, status, page, searchTerm, position]);

  useEffect(() => {
    const fetchGenerations = async () => {
      const data = await getGenerations();
      setGenerations(data);
    };
    const fetchPositions = async () => {
      const data = await getSLCPositions();
      setPositions(data);
    };
    fetchGenerations();
    fetchPositions();

    const params = new URLSearchParams(location.search);
    setGeneration(params.get("generation") || "");
    setOrderby(params.get("orderby") || "");
    setStatus(params.get("status") || "");
    setSearchTerm(params.get("search") || "");
    setPosition(params.get("position") || "");
    setPage(parseInt(params.get("page") || "1"));

    const searchElement = searchInputRef.current;

    const handleInput = () => {
      clearTimeout(fetchDataTimeoutRef.current as number);
      fetchDataTimeoutRef.current = setTimeout(() => {
        setSearchTerm(searchElement?.value || "");
      }, 600) as unknown as number;
    };

    searchElement?.addEventListener("input", handleInput);

    return () => {
      searchElement?.removeEventListener("input", handleInput);
      clearTimeout(fetchDataTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [generation, orderby, status, page, searchTerm, position]);

  useEffect(() => {
    if (isMounted) {
      setPage(1);
    } else {
      setIsMounted(true);
    }
  }, [generation, orderby, status, searchTerm, position]);

  return (
    <VStack gap={4}>
      <Text
        fontSize="4xl"
        fontWeight="bold"
        color="white"
        textShadow="1px 1px 1px rgba(30, 30, 30, 0.4)"
      >
        Assistants
      </Text>

      <Flex direction="column" alignItems="start" gap={4} width="100%">
        <AssistantsFilters
          searchInputRef={searchInputRef}
          setStatus={setStatus}
          setGeneration={setGeneration}
          setOrderby={setOrderby}
          setPosition={setPosition}
          generations={generations}
          positions={positions}
          searchTerm={searchTerm}
          generation={generation}
          status={status}
          orderby={orderby}
          position={position}
        />
      </Flex>

      <AssistantsGrid assistants={assistants} loading={loading} />

      {!loading && assistants.length === 0 ? (
        <AssistantsNotFound />
      ) : (
        assistants.length > 0 && (
          <Pagination
            count={count}
            page={page}
            setPage={setPage}
            itemsPerPage={itemsPerPage}
          />
        )
      )}
    </VStack>
  );
}
