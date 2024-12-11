import { Flex, SimpleGrid } from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import InputField from "../../../../components/InputField";
import SelectField from "../../../../components/SelectField";
import {
  createGenerationCollection,
  createOrderCollection,
  createPositionCollection,
  createStatusCollection,
} from "../collections/UsersFilterCollections";
import { SLCPosition } from "../../../../types/SLCPosition";

interface UsersFiltersProps {
  searchInputRef: React.RefObject<HTMLInputElement>;
  generations: string[];
  positions: SLCPosition[];
  searchTerm: string;
  generation: string;
  status: string;
  position: string;
  orderby: string;
  setGeneration: (generation: string) => void;
  setOrderby: (orderby: string) => void;
  setStatus: (status: string) => void;
  setPosition: (status: string) => void;
}

export default function UsersFilters({
  searchInputRef,
  generations,
  searchTerm,
  generation,
  status,
  orderby,
  position,
  positions,
  setGeneration,
  setOrderby,
  setStatus,
  setPosition,
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
      <SimpleGrid
        gap={4}
        width={{ base: "100%", md: "65%" }}
        columns={{ base: 2, md: 4 }}
      >
        <SelectField
          collection={createStatusCollection()}
          placeholder="All Statuses"
          onChange={setStatus}
          value={status}
        />
        <SelectField
          collection={createGenerationCollection(generations)}
          placeholder="All Generations"
          onChange={setGeneration}
          value={generation}
        />
        <SelectField
          collection={createPositionCollection(positions)}
          placeholder="All Positions"
          onChange={setPosition}
          value={position}
        />
        <SelectField
          collection={createOrderCollection()}
          placeholder="Order By"
          onChange={setOrderby}
          value={orderby}
        />
      </SimpleGrid>
    </Flex>
  );
}
