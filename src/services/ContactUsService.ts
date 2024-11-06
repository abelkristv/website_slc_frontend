import axios from "axios";
import { ContactUs } from "../types/ContactUs";

export const createContactUs = async (
  contact: ContactUs
): Promise<ContactUs> => {
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
