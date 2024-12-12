import { Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
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
      <SimpleGrid gap={4} width={"full"} columns={{ base: 3, md: 12 }}>
        <GridItem colSpan={{ base: 3, md: 3 }}>
          <InputField
            ref={searchInputRef}
            placeholder="Search"
            icon={<IoSearch color="gray.400" />}
            value={searchTerm}
          />
        </GridItem>
        <GridItem colSpan={{ base: 3, md: 3 }}>
          <SelectField
            collection={createPositionCollection(positions)}
            placeholder="All Positions"
            onChange={setPosition}
            value={position}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <SelectField
            collection={createGenerationCollection(generations)}
            placeholder="All Generations"
            onChange={setGeneration}
            value={generation}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <SelectField
            collection={createStatusCollection()}
            placeholder="All Statuses"
            onChange={setStatus}
            value={status}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <SelectField
            collection={createOrderCollection()}
            placeholder="Order By"
            onChange={setOrderby}
            value={orderby}
          />
        </GridItem>
      </SimpleGrid>
    </Flex>
  );
}
