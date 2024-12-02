import axios from "axios";
import { Gallery } from "../types/Gallery";

export const getAcceptedGalleries = async (): Promise<Gallery[]> => {
  try {
    const response = await axios.get<Gallery[]>(
      `${import.meta.env.VITE_BACKEND_URL}/galleries`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching accepted galleries:", error);
    throw error;
  }
};

export const getMyGalleries = async (): Promise<Gallery[]> => {
  try {
    const response = await axios.get<Gallery[]>(
      `${import.meta.env.VITE_BACKEND_URL}/my-galleries`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching my galleries:", error);
    throw error;
  }
};

export const getPendingGalleries = async (): Promise<Gallery[]> => {
  try {
    const response = await axios.get<Gallery[]>(
      `${import.meta.env.VITE_BACKEND_URL}/pending-galleries`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pending galleries:", error);
    throw error;
  }
};

export const createGallery = async (gallery: Gallery) => {
  try {
    await axios.post<Gallery>(
      `${import.meta.env.VITE_BACKEND_URL}/galleries`,
      gallery,
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error creating gallery:", error);
    throw error;
  }
};

export const updateGallery = async (gallery: Gallery) => {
  try {
    await axios.put<Gallery>(
      `${import.meta.env.VITE_BACKEND_URL}/galleries/${gallery.ID}`,
      gallery,
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error updating gallery:", error);
    throw error;
  }
};

export const deleteGallery = async (galleryId: number) => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/galleries/${galleryId}`,
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error deleting gallery:", error);
    throw error;
  }
};
