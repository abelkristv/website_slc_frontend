import { EmptyState } from "../../../components/ui/empty-state";
import { GoPeople } from "react-icons/go";
import { List } from "@chakra-ui/react";

export default function AssistantNotFound() {
  return (
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
  );
}
