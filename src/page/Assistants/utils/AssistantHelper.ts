import { Assistant } from "../../../models/Assistant";

export const filterAssistants = (
  assistants: Assistant[],
  filter: string,
  generationFilter: string
): Assistant[] => {
  return assistants
    .filter(
      (assistant) =>
        assistant.FullName.toLowerCase().includes(filter) ||
        assistant.Initial.toLowerCase().includes(filter)
    )
    .filter(
      (assistant) =>
        !generationFilter || assistant.Generation === generationFilter
    );
};

export const sortAssistants = (
  assistants: Assistant[],
  sortOption: string
): Assistant[] => {
  return assistants.slice().sort((a, b) => {
    let comparison = 0;
    if (sortOption === "FullName-asc") {
      comparison = a.FullName.localeCompare(b.FullName);
    } else if (sortOption === "FullName-desc") {
      comparison = b.FullName.localeCompare(a.FullName);
    } else if (sortOption === "Initial-asc") {
      comparison = a.Initial.localeCompare(b.Initial);
    } else if (sortOption === "Initial-desc") {
      comparison = b.Initial.localeCompare(a.Initial);
    } else if (sortOption === "Generation-asc") {
      comparison = a.Generation.localeCompare(b.Generation);
    } else if (sortOption === "Generation-desc") {
      comparison = b.Generation.localeCompare(a.Generation);
    }
    return comparison;
  });
};

export const getGenerations = (assistants: Assistant[]): string[] => {
  return Array.from(new Set(assistants.map((a) => a.Generation))).sort();
};
