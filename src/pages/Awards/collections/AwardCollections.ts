import { createListCollection } from "@chakra-ui/react";
import { AwardPeriod } from "../../../types/AwardPeriod";

export const createPeriodCollection = (periods: AwardPeriod[]) =>
  createListCollection({
    items: periods
      .filter((item) => item.Awards !== null)
      .map((item) => ({
        label: item.PeriodTitle,
        value: item.PeriodTitle,
      })),
  });
