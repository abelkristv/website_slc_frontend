import React, { forwardRef } from "react";
import { Input } from "@chakra-ui/react";
import { InputGroup } from "./ui/input-group";
import { useColorModeValue } from "./ui/color-mode";

interface InputFieldProps {
  type?: string;
  placeholder: string;
  icon?: React.ReactNode;
  value?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ type = "text", placeholder, icon, value }, ref) => (
    <InputGroup flex="1" startElement={icon} width="full">
      <Input
        ref={ref}
        type={type}
        placeholder={placeholder}
        focusRing="inside"
        focusRingColor="bluejack.100"
        borderRadius="sm"
        variant="outline"
        bg="primary"
        borderColor={useColorModeValue("gray.200", "gray.800")}
        _selection={{ bg: "bluejack.200", color: "white" }}
        defaultValue={value}
      />
    </InputGroup>
  )
);

export default InputField;
