import React from "react";
import { Text } from "@chakra-ui/react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <Text color="red.500" textAlign="center">
    {message}
  </Text>
);

export default ErrorMessage;
