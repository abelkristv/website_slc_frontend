import { createListCollection } from "@chakra-ui/react";

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
