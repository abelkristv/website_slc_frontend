import { useRef } from "react";
import { Button, VStack, HStack, Flex } from "@chakra-ui/react";
import { FaUser, FaLock } from "react-icons/fa";
import binus from "../../assets/binus.png";
import ribbon from "../../assets/ribbon.png";
import InputField from "../../components/InputField";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { loginUser } from "../../services/AuthService";
import HowToLoginDialog from "./components/HowToLoginDialog";

export default function LoginPage() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    try {
      await loginUser(username, password);
      showSuccessToast("Login successful");
    } catch (err: any) {
      const errorMessage = err.response?.data.message || "Login failed";
      showErrorToast(errorMessage);
    }
  };

  return (
    <Flex height="80vh" justifyContent="center" alignItems="center">
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
        <VStack
          as="form"
          onSubmit={handleSubmit}
          width="full"
          px={8}
          py={6}
          gap={4}
        >
          <InputField
            ref={usernameRef}
            name="username"
            placeholder="Initial"
            icon={<FaUser color="gray.300" />}
          />
          <InputField
            ref={passwordRef}
            name="password"
            type="password"
            placeholder="Password"
            icon={<FaLock color="gray.300" />}
          />
          <Button
            type="submit"
            bg="blue.600"
            color="white"
            _hover={{ bg: "blue.700" }}
            width="full"
          >
            Login
          </Button>
          <HowToLoginDialog />
        </VStack>
      </VStack>
    </Flex>
  );
}
