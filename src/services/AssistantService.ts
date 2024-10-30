import axios from "axios";
import { Assistant } from "../models/Assistant";

export const getAssistantData = async (
  generation?: string,
  name?: string,
  orderBy?: string,
  order?: "asc" | "desc"
): Promise<Assistant[]> => {
  try {
    const params: Record<string, string> = {};

    if (generation) {
      params.generation = generation;
    }

    if (name) {
      params.name = name;
    }

    if (orderBy) {
      params.orderBy = orderBy;
    }

    if (order) {
      params.order = order;
    }

    const response = await axios.get<Assistant[]>(
      `${import.meta.env.VITE_BACKEND_URL}/assistants`,
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching assistant data:", error);
    throw error;
  }
};

export const getGenerations = async (): Promise<string[]> => {
  try {
    const response = await axios.get<string[]>(
      `${import.meta.env.VITE_BACKEND_URL}/assistants/getgenerations`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching assistant data:", error);
    throw error;
  }
};
