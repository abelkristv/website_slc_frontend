import axios from "axios";
import { ContactUs } from "../types/ContactUs";

export const createContactUs = async (contact: ContactUs) => {
  try {
    const response = await axios.post<ContactUs>(
      `${import.meta.env.VITE_BACKEND_URL}/contacts`,
      contact
    );

    return response.data;
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error;
  }
};

export const getContactUs = async (): Promise<ContactUs[]> => {
  try {
    const response = await axios.get<ContactUs[]>(
      `${import.meta.env.VITE_BACKEND_URL}/contacts`,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching assistant data:", error);
    throw error;
  }
};
