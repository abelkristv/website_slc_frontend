import { createListCollection } from "@chakra-ui/react";
import { SLCPosition } from "../../../../types/SLCPosition";

export const createGenerationsCollection = (generations: string[]) =>
  createListCollection({
    items: generations.map((gen) => ({ label: gen, value: gen })),
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

export const createPositionCollection = (SLCPositions: SLCPosition[]) =>
  createListCollection({
    items: SLCPositions.map((position) => ({
      label: position.PositionName,
      value: position.ID.toString(),
    })),
  });
