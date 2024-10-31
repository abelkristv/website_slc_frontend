import { Box, Text } from "@chakra-ui/react";

const Achievements = () => {
  return (
    <Box
      mb={8}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      width="100%"
      p={8}
    >
      <Text fontSize="xl" fontWeight="bold" color={"gray.800"} mb={2}>
        Achievements
      </Text>
      <Text fontSize="sm" color="gray.500">
        - Detail any notable achievements here...
      </Text>
    </Box>
  );
};

export default Achievements;
