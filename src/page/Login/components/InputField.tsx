import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

interface InputFieldProps {
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
}) => (
  <InputGroup>
    <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>
    <Input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      variant="outline"
      focusBorderColor="blue.500"
      border="1px"
      borderColor="gray.400"
      _hover={{ borderColor: "blue.400" }}
    />
  </InputGroup>
);

export default InputField;
