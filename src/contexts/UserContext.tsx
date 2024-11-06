import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { User } from "../types/User";

interface UserContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  getCurrentUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        { username, password },
        { withCredentials: true }
      );
      getCurrentUser();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/currentuser`,
        { withCredentials: true }
      );
      setUser(response.data);
    } catch (error) {
      console.error("Token validation failed:", error);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`, null, {
        withCredentials: true,
      });
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, getCurrentUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
