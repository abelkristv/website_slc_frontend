import { Assistant } from "./Assistant";

export type AssistantPaginate = {
  users: Assistant[];
  total_count: number;
  total_pages: number;
};
