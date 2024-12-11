import axios from "axios";
import { Assistant } from "../types/Assistant";
import { AssistantPaginate } from "../types/AssistantPaginate";
import { SLCPosition } from "../types/SLCPosition";

export const getAssistants = async (
  generation?: string,
  name?: string,
  orderby?: string,
  status?: string,
  page?: string,
  position?: string,
  limit?: string
): Promise<AssistantPaginate> => {
  try {
    const params: Record<string, string> = {};

    if (generation) {
      params.generation = generation;
    }
    if (name) {
      params.name = name;
    }
    if (orderby) {
      params.orderby = orderby;
    }
    if (status) {
      params.status = status;
    }
    if (page) {
      params.page = page;
    }
    if (position) {
      params.slcposition = position;
    }
    if (limit) {
      params.limit = limit;
    }

    console.log(params);

    const response = await axios.get<AssistantPaginate>(
      `${import.meta.env.VITE_BACKEND_URL}/assistants`,
      { params }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching assistant data:", error);
    throw error;
  }
};

export const getAssistantById = async (id: string): Promise<Assistant> => {
  try {
    const response = await axios.get<Assistant>(
      `${import.meta.env.VITE_BACKEND_URL}/assistants/${id}`
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

export const getSLCPositions = async (): Promise<SLCPosition[]> => {
  try {
    const response = await axios.get<SLCPosition[]>(
      `${import.meta.env.VITE_BACKEND_URL}/positions`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching assistant data:", error);
    throw error;
  }
};

export const updateSLCPosition = async (
  AssistantID: number,
  SLCPositionID: number
) => {
  try {
    await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/assistants/${AssistantID}`,
      {
        SLCPositionID: SLCPositionID,
      },
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error updating SLC position:", error);
    throw error;
  }
};
