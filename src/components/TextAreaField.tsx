import React, { forwardRef } from "react";
import { Textarea } from "@chakra-ui/react";
import { InputGroup } from "./ui/input-group";

interface TextAreaFieldProps {
  placeholder: string;
  icon?: React.ReactNode;
  value?: string;
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ placeholder, icon, value }, ref) => (
    <InputGroup flex="1" startElement={icon} width="full">
      <Textarea
        resize={"none"}
        ref={ref}
        placeholder={placeholder}
        focusRing="inside"
        focusRingColor="bluejack.100"
        borderRadius="sm"
        variant="outline"
        bg="primary"
        shadow="xs"
        defaultValue={value}
        height={"8rem"}
      />
    </InputGroup>
  )
);

export default TextAreaField;
