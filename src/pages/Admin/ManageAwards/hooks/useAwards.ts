import { useEffect, useState } from "react";
import { Award } from "../../../../types/Award";
import { getAllAwards } from "../../../../services/AwardService";
import { getAssistants } from "../../../../services/AssistantService";
import { AssistantPaginate } from "../../../../types/AssistantPaginate";
import { getAllPeriods } from "../../../../services/PeriodService";
import { Period } from "../../../../types/Period";

export const useAwards = () => {
  const [awards, setAwards] = useState<Award[]>([]);
  const [assistantData, setAssistantData] = useState<AssistantPaginate | null>(
    null
  );
  const [periods, setPeriods] = useState<Period[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAwards = async () => {
    try {
      setIsLoading(true);
      const data = await getAllAwards();
      setAwards(data);
    } catch (error) {
      console.error("Error fetching awards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAssistants = async (
    page: string = "1",
    limit: string = "100",
    name?: string,
    generation?: string
  ) => {
    try {
      setIsLoading(true);
      const data = await getAssistants(
        generation,
        name,
        undefined,
        undefined,
        page,
        undefined,
        limit
      );
      setAssistantData(data);
    } catch (error) {
      console.error("Error fetching assistants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPeriods = async () => {
    try {
      setIsLoading(true);
      const data = await getAllPeriods();
      setPeriods(data);
    } catch (error) {
      console.error("Error fetching periods:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAwards();
    fetchAssistants();
    fetchPeriods();
  }, []);

  return {
    awards,
    assistants: assistantData?.users || [],
    totalAssistants: assistantData?.total_count || 0,
    totalPages: assistantData?.total_pages || 1,
    isLoading,
    periods,
    fetchAwards,
    fetchAssistants,
    fetchPeriods,
  };
};
