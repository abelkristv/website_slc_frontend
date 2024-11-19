// UsersTable.tsx
import { Table, Skeleton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { User } from "../../../../types/User";
import SelectField from "../../../../components/SelectField";
import { createPositionCollection } from "../collections/UsersFilterCollections";
import { Button } from "../../../../components/ui/button";

interface UsersTableProps {
  users: User[];
  page: number;
  itemsPerPage: number;
  loading: boolean;
  userPositions: { [key: string]: string };
  onPositionChange: (userId: string, newPosition: string) => void;
}

export default function UsersTable({
  users,
  page,
  itemsPerPage,
  loading,
  userPositions,
  onPositionChange,
}: UsersTableProps) {
  const resetPasswordHoverBg = { bg: "blue.50" };

  return (
    <Table.Root size="md" striped overflowX="scroll">
      <Table.Header>
        <Table.Row bgColor="bluejack.100">
          <Table.ColumnHeader width="6%" color="white">
            No
          </Table.ColumnHeader>
          <Table.ColumnHeader width="6%" color="white">
            Initial
          </Table.ColumnHeader>
          <Table.ColumnHeader width="8%" color="white">
            Generation
          </Table.ColumnHeader>
          <Table.ColumnHeader width="28%" color="white">
            Full Name
          </Table.ColumnHeader>
          <Table.ColumnHeader width="22%" color="white">
            Position
          </Table.ColumnHeader>
          <Table.ColumnHeader width="25%" color="white" pl={8}>
            Action
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  <Skeleton height="5" width="80%" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton height="5" width="80%" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton height="5" width="60%" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton height="5" width="90%" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton height="5" width="70%" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton height="5" width="50%" />
                </Table.Cell>
              </Table.Row>
            ))
          : users.map((user, index) => (
              <Table.Row key={index}>
                <Table.Cell>{(page - 1) * itemsPerPage + index + 1}</Table.Cell>
                <Table.Cell>{user.Assistant.Initial}</Table.Cell>
                <Table.Cell>{user.Assistant.Generation}</Table.Cell>
                <Table.Cell truncate maxW={20}>
                  {user.Assistant.FullName}
                </Table.Cell>
                <Table.Cell>
                  <SelectField
                    collection={createPositionCollection()}
                    placeholder="Select a position..."
                    onChange={(newPosition) =>
                      onPositionChange(user.ID, newPosition)
                    }
                    value={userPositions[user.ID] || ""}
                    size="xs"
                  />
                </Table.Cell>
                <Table.Cell display="flex" gap={4} pl={8}>
                  <Link to={`/assistants/${user.Assistant.ID}`}>
                    <Button
                      bg="bluejack.100"
                      _hover={{ bg: "bluejack.200" }}
                      size="xs"
                      px={4}
                      color="white"
                    >
                      View Profile
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    borderColor="bluejack.100"
                    color="bluejack.100"
                    size="xs"
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
  );
}
