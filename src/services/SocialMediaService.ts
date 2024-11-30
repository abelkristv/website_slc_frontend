import axios from "axios";
import { SocialMedia } from "../types/SocialMedia";
import { SyncLinkedin } from "../types/SyncLinkedin";

export const updateSocialMedia = async (socialMedia: SocialMedia) => {
  try {
    await axios.post<SocialMedia>(
      `${import.meta.env.VITE_BACKEND_URL}/assistant_social_media`,
      socialMedia,
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error;
  }
};

export const syncLinkedin = async (sync: SyncLinkedin) => {
  try {
    await axios.post<SocialMedia>(
      `${import.meta.env.VITE_FLASK_BACKEND_URL}/add-assistant-experiences`,
      sync
    );
  } catch (error) {
    throw error;
  }
};
