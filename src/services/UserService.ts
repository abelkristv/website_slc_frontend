import axios from "axios";
import { ChangePassword } from "../types/ChangePassword";
import { UserPaginate } from "../types/UserPaginate";

export const getUsers = async (
  generation?: string,
  name?: string,
  orderby?: string,
  status?: string,
  page?: string
): Promise<UserPaginate> => {
  try {
    const params: Record<string, string> = {};

    if (generation) {
      params.generation = generation;
    }
    if (name) {
      params.name = name;
    }
    if (orderby) {
      params.orderby = orderby;
    }
    if (status) {
      params.status = status;
    }
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
    await axios.put<ChangePassword>(
      `${import.meta.env.VITE_BACKEND_URL}/change-password`,
      changePassword,
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
