import { Flex, HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "./ui/pagination";

interface PaginationProps {
  count: number;
  page: number;
  itemsPerPage: number;
  setPage: (page: number) => void;
}

export default function Pagination({
  count,
  page,
  setPage,
  itemsPerPage,
}: PaginationProps) {
  return (
    <Flex>
      <PaginationRoot
        count={count}
        pageSize={itemsPerPage}
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
