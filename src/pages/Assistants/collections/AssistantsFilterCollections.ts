import { createListCollection } from "@chakra-ui/react";
import { SLCPosition } from "../../../types/SLCPosition";

export const createGenerationCollection = (generations: string[]) =>
  createListCollection({
    items: generations.map((gen) => ({ label: gen, value: gen })),
  });

export const createPositionCollection = (positions: SLCPosition[]) =>
  createListCollection({
    items: positions.map((pos) => ({
      label: pos.PositionName,
      value: pos.ID.toString(),
    })),
  });

export const createOrderCollection = () =>
  createListCollection({
    items: [
      { label: "Name", value: "name" },
      { label: "Initial", value: "initial" },
      { label: "Generation", value: "generation" },
    ],
  });

export const createStatusCollection = () =>
  createListCollection({
    items: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  });
