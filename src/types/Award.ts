import { Assistant } from "./Assistant";

export type Award = {
  ID?: number;
  AwardTitle: string;
  Assistants: Assistant[];
};
