import axios from "axios";

export const loginUser = async (username: string, password: string) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/login`,
    { username, password },
    { withCredentials: true }
  );

  console.log(response.data);
  return response.data;
};
