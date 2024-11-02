import { Flex, HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../../components/ui/pagination";

interface AssistantsPaginationProps {
  count: number;
  page: number;
  setPage: (page: number) => void;
}

export default function AssistantsPagination({
  count,
  page,
  setPage,
}: AssistantsPaginationProps) {
  return (
    <Flex>
      <PaginationRoot
        count={count}
        pageSize={24}
        page={page}
        bg="primary"
        borderRadius="sm"
        variant="subtle"
        onPageChange={(e) => setPage(e.page)}
        display={{ base: "none", lg: "flex" }}
      >
        <HStack>
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>

      <PaginationRoot
        count={count}
        pageSize={24}
        bg="primary"
        borderRadius="sm"
        variant="subtle"
        onPageChange={(e) => setPage(e.page)}
        display={{ base: "flex", lg: "none" }}
      >
        <HStack gap="4">
          <PaginationPrevTrigger />
          <PaginationPageText format="long" flex="1" />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </Flex>
  );
}
