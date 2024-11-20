import { VStack, Text, Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { getUsers } from "../../../services/UserService";
import {
  getGenerations,
  getSLCPositions,
} from "../../../services/AssistantService";
import { User } from "../../../types/User";
import Pagination from "../../../components/Pagination";
import AssistantsNotFound from "../../Assistants/components/AssistantsNotFound";
import UsersFilters from "./components/UsersFilters";
import UsersTable from "./components/UsersTable";
import { SLCPosition } from "../../../types/SLCPosition";

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [count, setCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage] = useState(25);
  const [generation, setGeneration] = useState<string>("");
  const [orderby, setOrderby] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [generations, setGenerations] = useState<string[]>([]);
  const [SLCPostions, setSLCPositions] = useState<SLCPosition[]>([]);

  const fetchDataTimeoutRef = useRef<number>(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const data = await getUsers(page.toString());
    setUsers(data.users);
    setCount(data.total_count);
    setLoading(false);
  };

  const updateSearchParams = () => {
    const params = new URLSearchParams();
    if (generation) params.set("generation", generation);
    if (orderby) params.set("orderby", orderby);
    if (status) params.set("status", status);
    if (searchTerm) params.set("search", searchTerm);
    params.set("page", page.toString());
    navigate(`?${params.toString()}`, { replace: true });
  };

  useEffect(() => {
    updateSearchParams();
  }, [generation, orderby, status, page, searchTerm]);

  useEffect(() => {
    const fetchGenerations = async () => {
      const data = await getGenerations();
      setGenerations(data);
    };
    fetchGenerations();

    const fetchSLCPositions = async () => {
      const data = await getSLCPositions();
      setSLCPositions(data);
    };
    fetchSLCPositions();

    const params = new URLSearchParams(location.search);
    setGeneration(params.get("generation") || "");
    setOrderby(params.get("orderby") || "");
    setStatus(params.get("status") || "");
    setSearchTerm(params.get("search") || "");
    setPage(parseInt(params.get("page") || "1"));

    const searchElement = searchInputRef.current;
    const handleInput = () => {
      clearTimeout(fetchDataTimeoutRef.current);
      fetchDataTimeoutRef.current = setTimeout(() => {
        setSearchTerm(searchElement?.value || "");
      }, 600);
    };

    searchElement?.addEventListener("input", handleInput);
    return () => {
      searchElement?.removeEventListener("input", handleInput);
      clearTimeout(fetchDataTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    updateSearchParams();
    fetchData();
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <VStack gap={4} bg="primary" p={6} borderRadius="lg" boxShadow="lg">
      <Text fontSize="4xl" fontWeight="bold" color="bluejack.100">
        Manage Users
      </Text>
      <UsersFilters
        searchInputRef={searchInputRef}
        setStatus={setStatus}
        setGeneration={setGeneration}
        setOrderby={setOrderby}
        generations={generations}
        searchTerm={searchTerm}
        generation={generation}
        status={status}
        orderby={orderby}
      />
      <Flex overflowX={"scroll"} width={"full"}>
        <UsersTable
          users={users}
          page={page}
          itemsPerPage={itemsPerPage}
          loading={loading}
          SLCPositions={SLCPostions}
          setUsers={setUsers}
        />
      </Flex>

      {!loading && users.length === 0 ? (
        <AssistantsNotFound />
      ) : (
        users.length > 0 && (
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
