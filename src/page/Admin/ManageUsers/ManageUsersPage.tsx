import { Box, Heading, HStack, Table, Text, VStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../../components/ui/pagination";
import { getUsers } from "../../../services/UserService";
import { useEffect, useState } from "react";
import { User } from "../../../types/User";
import { Button } from "../../../components/ui/button";
import { useColorModeValue } from "../../../components/ui/color-mode";
import Pagination from "../../../components/Pagination";
import AssistantsNotFound from "../../Assistants/components/AssistantsNotFound";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [count, setCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const data = await getUsers(page.toString());
    setUsers(data.users);
    setCount(data.total_count);
    setLoading(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setPage(parseInt(params.get("page") || "1"));
    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    navigate(`?${params.toString()}`, { replace: true });
    fetchData();
    window.scrollTo(0, 0);
  }, [page]);

  const resetPasswordHoverBg = useColorModeValue(
    { bg: "blue.50" },
    { bg: "gray.800" }
  );

  return (
    <VStack gap={4} bg="primary" p={6} borderRadius="lg" boxShadow="lg">
      <Text fontSize="4xl" fontWeight="bold" color="bluejack.100">
        Manage Users
      </Text>
      <Table.Root size="md" striped overflowX={"scroll"}>
        <Table.Header>
          <Table.Row bgColor={"bluejack.100"}>
            <Table.ColumnHeader width="6%" color={"white"}>
              No
            </Table.ColumnHeader>
            <Table.ColumnHeader width="6%" color={"white"}>
              Initial
            </Table.ColumnHeader>
            <Table.ColumnHeader width="8%" color={"white"}>
              Generation
            </Table.ColumnHeader>
            <Table.ColumnHeader width="30%" color={"white"}>
              Full Name
            </Table.ColumnHeader>
            <Table.ColumnHeader width="20%" color={"white"}>
              Position
            </Table.ColumnHeader>
            <Table.ColumnHeader width="20%" color={"white"}>
              Action
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user, index) => (
            <Table.Row key={index}>
              <Table.Cell>{(page - 1) * itemsPerPage + index + 1}</Table.Cell>
              <Table.Cell>{user.Assistant.Initial}</Table.Cell>
              <Table.Cell>{user.Assistant.Generation}</Table.Cell>
              <Table.Cell>{user.Assistant.FullName}</Table.Cell>
              <Table.Cell>Laboratory Assistant</Table.Cell>
              <Table.Cell display={"flex"} gap={4}>
                <Link to={`/assistants/${user.Assistant.ID}`}>
                  <Button
                    bg="bluejack.100"
                    _hover={{ bg: "bluejack.200" }}
                    size={"xs"}
                    px={4}
                    color={"white"}
                  >
                    View Profile
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  borderColor="bluejack.100"
                  color="bluejack.100"
                  size={"xs"}
                  px={4}
                  _hover={resetPasswordHoverBg}
                >
                  Reset Password
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
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
