import { Box, Heading, Text } from "@chakra-ui/react";

export default function ErrorPage() {
  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="lg" textAlign="center">
      <Heading as="h1" size="lg" color="gray.900" mb={4}>
        Oops! Something went wrong.
      </Heading>
      <Text fontSize="lg" color="gray.700" mb={2}>
        An unexpected error has occurred.
      </Text>
      <Text color="gray.500" fontStyle="italic" mb={2}>
        Page not found
      </Text>
    </Box>
  );
}
