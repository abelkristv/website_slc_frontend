import { Flex } from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import InputField from "../../../../components/InputField";
import SelectField from "../../../../components/SelectField";
import {
  createGenerationsCollection,
  createOrderCollection,
  createStatusCollection,
} from "../collections/UsersFilterCollections";

interface UsersFiltersProps {
  searchInputRef: React.RefObject<HTMLInputElement>;
  generations: string[];
  searchTerm: string;
  generation: string;
  status: string;
  orderby: string;
  setGeneration: (generation: string) => void;
  setOrderby: (orderby: string) => void;
  setStatus: (status: string) => void;
}

export default function UsersFilters({
  searchInputRef,
  generations,
  searchTerm,
  generation,
  status,
  orderby,
  setGeneration,
  setOrderby,
  setStatus,
}: UsersFiltersProps) {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      alignItems={{ base: "start", md: "center" }}
      justifyContent="space-between"
      width="100%"
      gap={4}
    >
      <InputField
        ref={searchInputRef}
        placeholder="Search"
        icon={<IoSearch color="gray.400" />}
        value={searchTerm}
      />
      <Flex gap={4} width={{ base: "100%", md: "60%" }}>
        <SelectField
          collection={createStatusCollection()}
          placeholder="All Statuses"
          onChange={setStatus}
          value={status}
          width="33%"
        />
        <SelectField
          collection={createGenerationsCollection(generations)}
          placeholder="All Generations"
          onChange={setGeneration}
          value={generation}
          width="33%"
        />
        <SelectField
          collection={createOrderCollection()}
          placeholder="Order By"
          onChange={setOrderby}
          value={orderby}
          width="33%"
        />
      </Flex>
    </Flex>
  );
}
