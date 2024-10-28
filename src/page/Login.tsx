import React, { useState } from "react";
import axios from "axios";
import ParticlesBackground from "../templates/ParticlesBackground";
import binus from "../assets/binus.png";
import ribbon from "../assets/ribbon.png";
import {
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  Link,
} from "@chakra-ui/react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<{
    username: string;
    password: string;
    error: string | null;
  }>({
    username: "",
    password: "",
    error: null,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        {
          username: formState.username,
          password: formState.password,
        }
      );

      localStorage.setItem("token", response.data.token);

      console.log("Login successful:", response.data);
      setFormState((prev) => ({ ...prev, error: "Login successful" }));
    } catch (err: unknown) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        setFormState((prev) => ({
          ...prev,
          error: err.response?.data.message || "Login failed",
        }));
      } else {
        setFormState((prev) => ({
          ...prev,
          error: "An unknown error occurred",
        }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-screen h-[85vh] flex justify-center items-center">
      <div className="w-3/4 max-w-96 md:w-96 bg-white rounded-lg shadow-lg flex flex-col justify-center z-10">
        <div className="flex ml-6 gap-4">
          <img src={ribbon} alt="" width={45} />
          <img src={binus} alt="" className="mt-4" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 justify-center w-[100%] h-[100%] p-8"
        >
          {formState.error && (
            <p className="text-red-500 text-center">{formState.error}</p>
          )}
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaUser color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              name="username"
              placeholder="Initial"
              value={formState.username}
              onChange={handleChange}
              variant="outline"
              focusBorderColor="blue.500"
              border="1px"
              borderColor="gray.400"
              _hover={{ borderColor: "blue.400" }}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaLock color="gray.300" />
            </InputLeftElement>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formState.password}
              onChange={handleChange}
              variant="outline"
              focusBorderColor="blue.500"
              border="1px"
              borderColor="gray.400"
              _hover={{ borderColor: "blue.400" }}
            />
          </InputGroup>
          <div
            id="submit-button-container"
            className="flex flex-col gap-4 justify-center items-center"
          >
            <Button
              type="submit"
              bg="#3a7bd5"
              color="white"
              _hover={{ bg: "#336ab3" }}
              width="100%"
            >
              Login
            </Button>
            <div className="flex gap-1">
              SLC Alumni?{" "}
              <Link color="blue.500" onClick={() => navigate("/register")}>
                Click here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
