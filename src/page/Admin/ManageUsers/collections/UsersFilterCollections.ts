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

export const createPositionCollection = () =>
  createListCollection({
    items: [
      {
        label: "Junior Laboratory Assistant",
        value: "Junior Laboratory Assistant",
      },
      { label: "Subject Coordinator", value: "Subject Coordinator" },
      {
        label: "Subject Development Officer",
        value: "Subject Development Officer",
      },
      {
        label: "Network Administrator Staff",
        value: "Network Administrator Staff",
      },
      {
        label: "Network Administrator Officer",
        value: "Network Administrator Officer",
      },
    ],
  });
