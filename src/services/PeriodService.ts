import axios from "axios";
import { Period } from "../types/Period";

export const getAllPeriods = async (): Promise<Period[]> => {
  try {
    const response = await axios.get<Period[]>(
      `${import.meta.env.VITE_BACKEND_URL}/periods`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching all periods data:", error);
    throw error;
  }
};
