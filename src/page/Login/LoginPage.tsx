import binus from "../../assets/binus.png";
import ribbon from "../../assets/ribbon.png";
import { Button, Link, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { useLogin } from "../../hooks/useLogin";
import ErrorMessage from "./components/ErrorMessage";
import InputField from "./components/InputField";

export default function LoginPage() {
  const navigate = useNavigate();
  const { formState, handleChange, handleSubmit } = useLogin();

  return (
    <div className="w-screen h-[85vh] flex justify-center items-center">
      <div className="w-3/4 max-w-96 md:w-96 bg-white rounded-lg shadow-lg flex flex-col backdrop-blur-xl">
        <div className="flex mx-8 gap-4">
          <img src={ribbon} alt="Ribbon Logo" width={45} />
          <img src={binus} alt="Binus Logo" className="mt-4" />
        </div>
        <form onSubmit={handleSubmit} className="w-full p-8">
          <VStack spacing={4}>
            {formState.error && <ErrorMessage message={formState.error} />}
            <InputField
              name="username"
              placeholder="Initial"
              value={formState.username}
              onChange={handleChange}
              icon={<FaUser color="gray.300" />}
            />
            <InputField
              name="password"
              type="password"
              placeholder="Password"
              value={formState.password}
              onChange={handleChange}
              icon={<FaLock color="gray.300" />}
            />
            <Button
              type="submit"
              bg="#3a7bd5"
              color="white"
              _hover={{ bg: "#336ab3" }}
              width="100%"
            >
              Login
            </Button>
            <Text>
              SLC Alumni?{" "}
              <Link color="blue.500" onClick={() => navigate("/register")}>
                Click here
              </Link>
            </Text>
          </VStack>
        </form>
      </div>
    </div>
  );
}
