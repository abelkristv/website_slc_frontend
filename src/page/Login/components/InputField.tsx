import React from "react";
import { Input } from "@chakra-ui/react";
import { InputGroup } from "../../../components/ui/input-group";

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
  <InputGroup flex="1" startElement={icon} width="full">
    <Input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      borderColor="gray.400"
      _hover={{ borderColor: "blue.400" }}
      focusRing="inside"
      focusRingColor="blue.400"
      outline="none"
      borderRadius="md"
      padding="2"
    />
  </InputGroup>
);

export default InputField;
