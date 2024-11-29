import axios from "axios";
import { ContactUs } from "../types/ContactUs";

export const createContactUs = async (contactUs: ContactUs) => {
  try {
    const response = await axios.post<ContactUs>(
      `${import.meta.env.VITE_BACKEND_URL}/contacts`,
      contactUs
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

export const updateIsRead = async (id: number): Promise<void> => {
  try {
    await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/contacts/isread/${id}`,
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.error(`Error updating isRead status for contact ID ${id}:`, error);
    throw error;
  }
};

export const deleteMessage = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/contacts/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error(`Error deleting contact with ID ${id}:`, error);
    throw error;
  }
};
