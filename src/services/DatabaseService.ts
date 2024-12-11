import axios from "axios";
import { Login } from "../types/Login";

export const syncDatabase = async (login: Login) => {
  try {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/wiredsync`, login, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Sync failed:", error);
    throw error;
  }
};
