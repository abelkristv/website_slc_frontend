import { Box, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components/ui/button";

interface CollapsibleDescriptionProps {
  description: string;
}

export default function CollapsibleDescription({
  description,
}: CollapsibleDescriptionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(20);
  const contentRef = useRef<HTMLDivElement>(null);
  const previewHeight = 20;

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(
        isOpen ? contentRef.current.scrollHeight : previewHeight
      );
    }
  }, [isOpen, description]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Box mt={1}>
      <Box
        style={{
          height: `${contentHeight}px`,
          overflow: "hidden",
          transition: "height 0.2s ease",
        }}
      >
        <Box ref={contentRef}>
          <Text fontSize="sm" whiteSpace="pre-line">
            {description}
          </Text>
        </Box>
      </Box>
      {description.length > previewHeight && (
        <Button
          size="sm"
          variant="plain"
          onClick={toggleOpen}
          p={0}
          mt={1}
          color="bluejack.100"
          _hover={{ color: "bluejack.200", textDecoration: "underline" }}
          textAlign={"right"}
          mb={-2}
        >
          {isOpen ? "See less" : "See more"}
        </Button>
      )}
    </Box>
  );
}
