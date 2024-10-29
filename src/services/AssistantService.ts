import axios from "axios";
import { Assistant } from "../models/Assistant";

export const getAssistantData = async (): Promise<Assistant[]> => {
  try {
    const response = await axios.get<Assistant[]>(
      `${import.meta.env.VITE_BACKEND_URL}/assistants`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching assistant data:", error);
    throw error;
  }
};
