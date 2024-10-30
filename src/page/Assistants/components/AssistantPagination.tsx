import { Flex, HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../../components/ui/pagination";

interface AssistantPaginationProps {
  count: number;
  page: number;
  setPage: (page: number) => void;
}

export default function AssistantPagination({
  count,
  page,
  setPage,
}: AssistantPaginationProps) {
  return (
    <Flex>
      <PaginationRoot
        count={count}
        pageSize={24}
        page={page}
        bgColor="white"
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
        bgColor="white"
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
