import React, { forwardRef } from "react";
import { Input } from "@chakra-ui/react";
import { InputGroup } from "./ui/input-group";

interface InputFieldProps {
  name: string;
  type?: string;
  placeholder: string;
  icon: React.ReactNode;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ name, type = "text", placeholder, icon }, ref) => (
    <InputGroup flex="1" startElement={icon} width="full">
      <Input
        ref={ref}
        type={type}
        name={name}
        placeholder={placeholder}
        focusRing="inside"
        focusRingColor="blue.400"
        borderRadius="sm"
        variant="outline"
        bgColor="white"
        shadow="sm"
      />
    </InputGroup>
  )
);

export default InputField;
