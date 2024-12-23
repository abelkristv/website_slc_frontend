import axios from "axios";
import { AwardPeriod } from "../types/AwardPeriod";
import { Award } from "../types/Award";
import { AssistantAward } from "../types/AssistantAward";

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

export const getAllAwards = async (): Promise<Award[]> => {
  try {
    const response = await axios.get<Award[]>(
      `${import.meta.env.VITE_BACKEND_URL}/all-awards`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching all awards data:", error);
    throw error;
  }
};

export const createAward = async (award: AssistantAward) => {
  console.log("Creating award:", award);
  try {
    await axios.post<AssistantAward>(
      `${import.meta.env.VITE_BACKEND_URL}/assistant_awards`,
      award,
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error("Error creating assistant award:", error);
    throw error;
  }
};
