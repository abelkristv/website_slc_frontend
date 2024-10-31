import { Box, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";

const TeachingHistory = () => {
  const [value, setValue] = useState<string>("1");

  const tabs = [
    { value: "1", label: "Odd 2023 / 2024", content: "First panel" },
    { value: "2", label: "Even 2023 / 2024", content: "Second panel" },
    { value: "3", label: "Odd 2024 / 2025", content: "Third panel" },
    { value: "4", label: "Even 2024 / 2025", content: "Fourth panel" },
  ];

  const handleTabChange = (tabValue: string) => {
    setValue(tabValue);
  };

  return (
    <Box
      mb={4}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      width="100%"
      p={8}
    >
      <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={4}>
        Teaching History
      </Text>

      <Box overflowX="scroll">
        <Flex marginBottom="1rem">
          {tabs.map((tab) => (
            <Box
              key={tab.value}
              minWidth="10rem"
              p={2}
              cursor="pointer"
              onClick={() => handleTabChange(tab.value)}
              borderWidth="1px"
              borderRadius="sm"
              borderBottomRadius="0"
              borderColor={value === tab.value ? "gray.200" : "transparent"}
              borderBottomColor={
                value === tab.value ? "transparent" : "gray.200"
              }
              textAlign="center"
              color="blue.600"
              fontSize="sm"
              fontWeight="semibold"
              transition="border-color 0.2s ease-in-out"
            >
              {tab.label}
            </Box>
          ))}
        </Flex>

        <Box minHeight="4rem">
          {tabs.find((tab) => tab.value === value)?.content}
        </Box>
      </Box>
    </Box>
  );
};

export default TeachingHistory;
