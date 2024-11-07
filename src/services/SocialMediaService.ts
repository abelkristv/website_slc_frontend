import axios from "axios";
import { SocialMedia } from "../types/SocialMedia";
import { SyncLinkedin } from "../types/SyncLinkedin";

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

export const syncLinkedin = async (sync: SyncLinkedin) => {
  try {
    const response = await axios.post<SocialMedia>(
      `${import.meta.env.VITE_FLASK_BACKEND_URL}/add_assistant_position`,
      sync
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
