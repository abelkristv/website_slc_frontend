import { useRef, useState } from "react";
import { Button, VStack, Flex, Spinner, Text } from "@chakra-ui/react";
import { FaUser, FaLock } from "react-icons/fa";
import { showErrorToast, showSuccessToast } from "../../../utils/toastUtils";
import InputField from "../../../components/InputField";
import { Alert } from "../../../components/ui/alert";
import { syncDatabase } from "../../../services/DatabaseService";

export default function LoginPage() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    const Username = usernameRef.current?.value || "";
    const Password = passwordRef.current?.value || "";
    setIsLoading(true);

    try {
      await syncDatabase({ Username, Password });
      showSuccessToast("Sync Successfull");
    } catch (err: any) {
      const errorMessage = err.response?.data || "Sync failed";
      showErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex height="80vh" justifyContent="center" alignItems="center">
      <VStack
        width="90%"
        maxW="384px"
        bg="primary"
        borderRadius="lg"
        alignItems="center"
        gap={2}
        boxShadow="lg"
        p={{ base: 6, md: 8 }}
      >
        <Text fontSize="4xl" fontWeight="bold" color="bluejack.100">
          Sync Database
        </Text>
        <Text>Enter your messier credentials</Text>
        <Alert
          status="info"
          title="Syncing database will impact messier performance"
          my={2}
        />
        <VStack as="form" onSubmit={handleSubmit} width="full" gap={4}>
          <InputField
            ref={usernameRef}
            placeholder="Initial"
            icon={<FaUser color="gray.300" />}
          />
          <InputField
            ref={passwordRef}
            type="password"
            placeholder="Password"
            icon={<FaLock color="gray.300" />}
          />
          <Button
            type="submit"
            bg="bluejack.100"
            color="white"
            _hover={{ bg: "bluejack.200" }}
            width="full"
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner borderWidth={"3px"} size={"sm"} animationDuration="1s" />
            ) : (
              ""
            )}
            Sync
          </Button>
        </VStack>
      </VStack>
    </Flex>
  );
}
