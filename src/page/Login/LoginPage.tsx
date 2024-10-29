import { useState } from "react";
import { Button, VStack, Box, HStack, IconButton } from "@chakra-ui/react";
import { FaUser, FaLock } from "react-icons/fa";
import binus from "../../assets/binus.png";
import ribbon from "../../assets/ribbon.png";
import InputField from "./components/InputField";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { loginUser } from "../../services/AuthService";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
} from "../../components/ui/dialog";
import { MdQuestionMark } from "react-icons/md";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    name === "username" ? setUsername(value) : setPassword(value);
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
        <Box as="form" onSubmit={handleSubmit} width="full" px={8} py={6}>
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
            <DialogRoot>
              <DialogTrigger asChild>
                <IconButton
                  aria-label="Default Password Info"
                  variant="outline"
                  rounded="full"
                  px={4}
                  borderColor="gray.300"
                >
                  <MdQuestionMark /> How to Login
                </IconButton>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>How to Login</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <p>
                    This login is for assistants and alumni of Software
                    Laboratory Center:
                  </p>
                  <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
                    <li>
                      <strong>Username Format:</strong> Use your{" "}
                      <em>initial</em> and <em>generation</em> (e.g.,{" "}
                      <strong>DT23-2</strong>).
                    </li>
                    <li>
                      <strong>Default Password:</strong> Your birthdate in the
                      format <strong>slc-DDMMYYYY</strong>.
                    </li>
                  </ul>
                  <p style={{ marginTop: "10px" }}>
                    <em>Example:</em> If your birthdate is June 23, 2003, your
                    default password would be <strong>slc-23062003</strong>.
                  </p>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button variant="outline">Close</Button>
                  </DialogActionTrigger>
                </DialogFooter>
                <DialogCloseTrigger />
              </DialogContent>
            </DialogRoot>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
