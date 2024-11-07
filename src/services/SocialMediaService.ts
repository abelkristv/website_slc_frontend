import axios from "axios";
import { SocialMedia } from "../types/SocialMedia";

export const updateSocialMedia = async (socialMedia: SocialMedia) => {
  try {
    const response = await axios.post<SocialMedia>(
      `${import.meta.env.VITE_BACKEND_URL}/assistant_social_media`,
      socialMedia,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error;
  }
};
