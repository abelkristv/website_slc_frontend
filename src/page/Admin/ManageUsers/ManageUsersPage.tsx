import { VStack, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { getUsers } from "../../../services/UserService";
import { getGenerations } from "../../../services/AssistantService";
import { User } from "../../../types/User";
import Pagination from "../../../components/Pagination";
import AssistantsNotFound from "../../Assistants/components/AssistantsNotFound";
import UsersFilters from "./components/UsersFilters";
import UsersTable from "./components/UsersTable";

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [count, setCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage] = useState(25);
  const [userPositions, setUserPositions] = useState<{ [key: string]: string }>(
    {}
  );
  const [generation, setGeneration] = useState<string>("");
  const [orderby, setOrderby] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [generations, setGenerations] = useState<string[]>([]);

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

  const handlePositionChange = (userId: string, newPosition: string) => {
    setUserPositions((prevPositions) => ({
      ...prevPositions,
      [userId]: newPosition,
    }));
  };

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
      <UsersTable
        users={users}
        page={page}
        itemsPerPage={itemsPerPage}
        loading={loading}
        userPositions={userPositions}
        onPositionChange={handlePositionChange}
      />
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
