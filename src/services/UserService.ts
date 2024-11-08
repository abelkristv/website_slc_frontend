import axios from "axios";
import { ChangePassword } from "../types/ChangePassword";
import { UserPaginate } from "../types/UserPaginate";

export const getUsers = async (page?: string): Promise<UserPaginate> => {
  try {
    const params: Record<string, string> = {};

    if (page) {
      params.page = page;
    }

    const response = await axios.get<UserPaginate>(
      `${import.meta.env.VITE_BACKEND_URL}/users`,
      { params }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching assistant data:", error);
    throw error;
  }
};

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
