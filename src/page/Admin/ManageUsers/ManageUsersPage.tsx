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

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    setLoading(true);
    const data = await getUsers();
    setUsers(data.users);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <VStack gap={4} bg="primary" p={6} borderRadius="lg" boxShadow="lg">
      <Text fontSize="4xl" fontWeight="bold" color="bluejack.100">
        Manage Users
      </Text>
      <Table.Root size="md" striped>
        <Table.Header>
          <Table.Row bgColor={"bluejack.100"}>
            <Table.ColumnHeader color={"white"}>No</Table.ColumnHeader>
            <Table.ColumnHeader color={"white"}>Initial</Table.ColumnHeader>
            <Table.ColumnHeader color={"white"}>Generation</Table.ColumnHeader>
            <Table.ColumnHeader color={"white"}>Full Name</Table.ColumnHeader>
            <Table.ColumnHeader color={"white"}>Position</Table.ColumnHeader>
            <Table.ColumnHeader color={"white"}>Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user, index) => (
            <Table.Row key={index}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{user.Assistant.Initial}</Table.Cell>
              <Table.Cell>{user.Assistant.Generation}</Table.Cell>
              <Table.Cell>{user.Assistant.FullName}</Table.Cell>
              <Table.Cell>Laboratory Assistant</Table.Cell>
              <Table.Cell display={"flex"} gap={4}>
                <Button
                  bg="bluejack.100"
                  _hover={{ bg: "bluejack.200" }}
                  size={"xs"}
                  px={4}
                  color={"white"}
                >
                  View Profile
                </Button>
                <Button
                  variant="outline"
                  borderColor="bluejack.100"
                  color="bluejack.100"
                  size={"xs"}
                  px={4}
                  _hover={useColorModeValue(
                    { bg: "blue.50" },
                    { bg: "gray.800" }
                  )}
                >
                  Reset Password
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <PaginationRoot
        count={users.length * 5}
        pageSize={5}
        page={1}
        bg="primary"
        borderRadius="sm"
        variant="subtle"
      >
        <HStack wrap="wrap">
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </VStack>
  );
}
