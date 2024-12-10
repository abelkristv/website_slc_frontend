import axios from "axios";
import { AwardPeriod } from "../types/AwardPeriod";

export const getAwards = async (): Promise<AwardPeriod[]> => {
  try {
    const response = await axios.get<AwardPeriod[]>(
      `${import.meta.env.VITE_BACKEND_URL}/awards`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching awards data:", error);
    throw error;
  }
};
