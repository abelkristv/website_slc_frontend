import axios from "axios";
import { ChangePassword } from "../types/ChangePassword";

export const changePassword = async (changePassword: ChangePassword) => {
  try {
    const response = await axios.put<ChangePassword>(
      `${import.meta.env.VITE_BACKEND_URL}/change-password`,
      changePassword,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
