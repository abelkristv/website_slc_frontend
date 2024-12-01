import React, { forwardRef } from "react";
import { Textarea } from "@chakra-ui/react";
import { InputGroup } from "./ui/input-group";
import { useColorModeValue } from "./ui/color-mode";

interface TextAreaFieldProps {
  placeholder: string;
  icon?: React.ReactNode;
  value?: string;
  minHeight?: number;
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ placeholder, icon, value, minHeight = 0 }, ref) => (
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
        borderColor={useColorModeValue("gray.200", "gray.800")}
        _selection={{ bg: "bluejack.200", color: "white" }}
        defaultValue={value}
        height={"8rem"}
        minHeight={minHeight}
      />
    </InputGroup>
  )
);

export default TextAreaField;
