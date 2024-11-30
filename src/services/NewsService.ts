import axios from "axios";
import { News } from "../types/News";

export const createNews = async (news: News) => {
  try {
    await axios.post<News>(`${import.meta.env.VITE_BACKEND_URL}/news`, news, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error creating news:", error);
    throw error;
  }
};

export const getNews = async (): Promise<News[]> => {
  try {
    const response = await axios.get<News[]>(
      `${import.meta.env.VITE_BACKEND_URL}/news`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw error;
  }
};

export const deleteNews = async (newsId: string) => {
  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/news/${newsId}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error deleting news:", error);
    throw error;
  }
};
