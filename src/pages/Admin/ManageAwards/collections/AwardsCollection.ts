import { createListCollection } from "@chakra-ui/react";
import { Award } from "../../../../types/Award";
import { Assistant } from "../../../../types/Assistant";

export const createAwardCollection = (awards: Award[]) => {
  const awardCollection = createListCollection({
    items: awards.map((award) => ({
      label: award.AwardTitle,
      value: award.AwardTitle,
    })),
  });
  return awardCollection;
};

export const createAssistantCollection = (assistants: Assistant[]) => {
  const assistantCollection = createListCollection({
    items: assistants.map((assistant) => ({
      label: `${assistant.Initial} (${assistant.Generation})`,
      value: assistant.ID.toString(),
    })),
  });
  return assistantCollection;
};
