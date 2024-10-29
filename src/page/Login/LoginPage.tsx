import { useState } from "react";
import binus from "../../assets/binus.png";
import ribbon from "../../assets/ribbon.png";
import { Button, Link, VStack, Text, Box, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import InputField from "./components/InputField";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { loginUser } from "../../services/AuthService";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      await loginUser(username, password);
      showSuccessToast("Login successful");
    } catch (err: any) {
      const errorMessage =
        err.response?.data.message || "An unknown error occurred";
      showErrorToast(errorMessage);
    }
  };

  return (
    <Box
      height="80vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack
        width="90%"
        maxW="384px"
        bg="white"
        borderRadius="lg"
        alignItems="center"
        gap={2}
        boxShadow="lg"
      >
        <HStack width="full" gap={4} zIndex={10}>
          <img
            src={ribbon}
            alt="Ribbon Logo"
            width={45}
            style={{ marginLeft: "2rem" }}
          />
          <img src={binus} alt="Binus Logo" style={{ marginTop: "1rem" }} />
        </HStack>
        <Box as="form" onSubmit={handleSubmit} width="full" p={8}>
          <VStack gap={4}>
            <InputField
              name="username"
              placeholder="Initial"
              value={username}
              onChange={handleChange}
              icon={<FaUser color="gray.300" />}
            />
            <InputField
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              icon={<FaLock color="gray.300" />}
            />
            <Button
              type="submit"
              bg="#3a7bd5"
              color="white"
              _hover={{ bg: "#336ab3" }}
              width="full"
            >
              Login
            </Button>
            <Text fontSize="sm">
              SLC Alumni?{" "}
              <Link
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
                onClick={() => navigate("/register")}
              >
                Click here
              </Link>
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
