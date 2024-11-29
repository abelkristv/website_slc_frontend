import axios from "axios";
import { News } from "../types/News";

export const createNews = async (news: News) => {
  console.log(news);
  try {
    const response = await axios.post<News>(
      `${import.meta.env.VITE_BACKEND_URL}/news`,
      news,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error;
  }
};
