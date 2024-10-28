import { useState } from "react";
import { loginUser } from "../services/AuthService";

interface FormState {
  username: string;
  password: string;
  error: string | null;
}

export function useLogin() {
  const [formState, setFormState] = useState<FormState>({
    username: "",
    password: "",
    error: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginUser(formState.username, formState.password);
      setFormState((prev) => ({ ...prev, error: "Login successful" }));
    } catch (err: any) {
      const errorMessage =
        err.response?.data.message || "An unknown error occurred";
      setFormState((prev) => ({ ...prev, error: errorMessage }));
    }
  };

  return { formState, handleChange, handleSubmit };
}
