import { Flex } from "@chakra-ui/react";
import InputField from "../../../components/InputField";
import { IoSearch } from "react-icons/io5";
import SelectField from "../../../components/SelectField";
import {
  createGenerationsCollection,
  createOrderCollection,
  createStatusCollection,
} from "../utils/AssistantsFilterCollections";

interface AssistantsFiltersProps {
  searchInputRef: React.RefObject<HTMLInputElement>;
  generations: string[];
  setGeneration: (generation: string) => void;
  setOrderby: (orderby: string) => void;
  setStatus: (status: string) => void;
}

export default function AssistanstFilters({
  searchInputRef,
  generations,
  setGeneration,
  setOrderby,
  setStatus,
}: AssistantsFiltersProps) {
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
        name="username"
        placeholder="Search"
        icon={<IoSearch color="gray.400" />}
      />
      <Flex gap={4} width={{ base: "100%", md: "60%" }}>
        <SelectField
          collection={createStatusCollection()}
          placeholder="All Statuses"
          onChange={setStatus}
          width="33%"
        />
        <SelectField
          collection={createGenerationsCollection(generations)}
          placeholder="All Generations"
          onChange={setGeneration}
          width="33%"
        />
        <SelectField
          collection={createOrderCollection()}
          placeholder="Order By"
          onChange={setOrderby}
          width="33%"
        />
      </Flex>
    </Flex>
  );
}
