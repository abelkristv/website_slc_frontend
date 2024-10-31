import axios from "axios";
import { TeachingHistory } from "../models/TeachingHistory";

export const getAssistantTeachingHistory = async (
  username: string
): Promise<TeachingHistory[]> => {
  console.log(username);
  try {
    const response = await axios.get<TeachingHistory[]>(
      `${import.meta.env.VITE_BACKEND_URL}/teaching-history/grouped`,
      { params: { assistant_username: username } }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching assistant data:", error);
    throw error;
  }
};
