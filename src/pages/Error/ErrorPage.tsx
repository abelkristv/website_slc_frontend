import { Box, Heading, Text } from "@chakra-ui/react";

export default function ErrorPage() {
  return (
    <Box bg="primary" p={8} borderRadius="lg" boxShadow="lg" textAlign="center">
      <Heading
        as="h1"
        size="lg"
        color={{ base: "gray.900", _dark: "gray.200" }}
        mb={4}
      >
        Oops! Something went wrong.
      </Heading>
      <Text
        fontSize="lg"
        color={{ base: "gray.700", _dark: "gray.400" }}
        mb={2}
      >
        An unexpected error has occurred.
      </Text>
      <Text color="gray.500" fontStyle="italic">
        Page not found
      </Text>
    </Box>
  );
}
