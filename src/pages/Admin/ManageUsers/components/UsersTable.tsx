import { Table, Skeleton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { SLCPosition } from "../../../../types/SLCPosition";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastUtils";
import { updateSLCPosition } from "../../../../services/AssistantService";
import { Assistant } from "../../../../types/Assistant";

interface UsersTableProps {
  assistants: Assistant[];
  page: number;
  itemsPerPage: number;
  loading: boolean;
  SLCPositions: SLCPosition[];
  setAssistants: (assistants: Assistant[]) => void;
}

export default function UsersTable({
  assistants,
  page,
  itemsPerPage,
  loading,
  SLCPositions,
  setAssistants,
}: UsersTableProps) {
  const updatePosition = async (AssistantID: number, SLCPositionID: number) => {
    const assistantIndex = assistants.findIndex(
      (assistant) => assistant.ID === AssistantID
    );
    if (assistantIndex === -1) return;

    const originalAssistant = { ...assistants[assistantIndex] };
    const updatedAssistants = [...assistants];
    updatedAssistants[assistantIndex] = {
      ...originalAssistant,
      SLCPosition:
        SLCPositions.find((pos) => pos.ID === SLCPositionID) || undefined,
    };

    setAssistants(updatedAssistants);

    try {
      await updateSLCPosition(AssistantID, SLCPositionID);
      showSuccessToast("Position updated successfully!");
    } catch (error) {
      setAssistants(assistants);
      showErrorToast("Failed to update position. Please try again.");
    }
  };

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
          <Table.ColumnHeader width="28%" minWidth={64} color="white">
            Full Name
          </Table.ColumnHeader>
          <Table.ColumnHeader width="22%" minWidth={64} color="white">
            Position
          </Table.ColumnHeader>
          <Table.ColumnHeader width="25%" minWidth={24} color="white" pl={8}>
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
          : assistants.map((assistant, index) => (
              <Table.Row key={index}>
                <Table.Cell>{(page - 1) * itemsPerPage + index + 1}</Table.Cell>
                <Table.Cell>{assistant.Initial}</Table.Cell>
                <Table.Cell>{assistant.Generation}</Table.Cell>
                <Table.Cell truncate maxW={20}>
                  {assistant.FullName}
                </Table.Cell>
                <Table.Cell>
                  <select
                    value={
                      assistant.SLCPosition?.ID
                        ? assistant.SLCPosition.ID.toString()
                        : ""
                    }
                    onChange={(e) =>
                      updatePosition(assistant.ID, parseInt(e.target.value))
                    }
                    style={{
                      padding: "6px 8px",
                      fontSize: "14px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      minWidth: "100%",
                    }}
                  >
                    <option value="" disabled>
                      Select a position...
                    </option>
                    {SLCPositions.map((position) => (
                      <option key={position.ID} value={position.ID}>
                        {position.PositionName}
                      </option>
                    ))}
                  </select>
                </Table.Cell>
                <Table.Cell display="flex" gap={4} pl={8}>
                  <Link to={`/assistants/${assistant.ID}`}>
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
                  {/* <Button
                    variant="outline"
                    borderColor="bluejack.100"
                    color="bluejack.100"
                    size="xs"
                    px={4}
                    _hover={resetPasswordHoverBg}
                  >
                    Reset Password
                  </Button> */}
                </Table.Cell>
              </Table.Row>
            ))}
      </Table.Body>
    </Table.Root>
  );
}
