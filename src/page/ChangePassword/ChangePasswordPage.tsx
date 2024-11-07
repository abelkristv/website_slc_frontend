import { useRef, useState } from "react";
import {
  Button,
  VStack,
  Flex,
  Text,
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";
import InputField from "../../components/InputField";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { Field } from "../../components/ui/field";
import { MdLockOpen } from "react-icons/md";
import { changePassword } from "../../services/UserService";

export default function ChangePasswordPage() {
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const formWidth = useBreakpointValue({
    base: "100%",
    md: "80%",
    lg: "480px",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    const ChangePassword = {
      OldPassword: oldPasswordRef.current?.value || "",
      NewPassword: newPasswordRef.current?.value || "",
      ConfirmNewPassword: confirmPasswordRef.current?.value || "",
    };

    setIsLoading(true);

    try {
      await changePassword(ChangePassword);
      showSuccessToast("Password changed successfully");
      if (oldPasswordRef.current) oldPasswordRef.current.value = "";
      if (newPasswordRef.current) newPasswordRef.current.value = "";
      if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";
    } catch (err: any) {
      const errorMessage = err.response?.data || "Password change failed";
      showErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex minHeight="80vh" justifyContent="center" alignItems="center" px={4}>
      <VStack
        as="form"
        onSubmit={handleSubmit}
        width={formWidth}
        maxW="100%"
        px={{ base: 6, md: 8 }}
        py={10}
        borderRadius="lg"
        boxShadow="xl"
        bg="primary"
      >
        <Text fontSize="4xl" fontWeight="bold" color="bluejack.100">
          Change Password
        </Text>

        <Field label="Old Password" required mt={4}>
          <InputField
            type="password"
            ref={oldPasswordRef}
            placeholder="Old Password"
            icon={<MdLockOpen color="gray.300" />}
          />
        </Field>
        <Field label="New Password" required>
          <InputField
            type="password"
            ref={newPasswordRef}
            placeholder="New Password"
            icon={<MdLockOpen color="gray.300" />}
          />
        </Field>
        <Field label="Confirm New Password" required>
          <InputField
            type="password"
            ref={confirmPasswordRef}
            placeholder="Confirm New Password"
            icon={<MdLockOpen color="gray.300" />}
          />
        </Field>
        <Button
          type="submit"
          bg="bluejack.100"
          color="white"
          _hover={{ bg: "bluejack.200" }}
          width="full"
          mt={6}
          disabled={isLoading}
        >
          {isLoading ? <Spinner size="sm" color="white" /> : ""} Change Password
        </Button>
      </VStack>
    </Flex>
  );
}
