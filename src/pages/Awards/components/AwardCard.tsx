import { Box, Image, Text, VStack, Badge } from "@chakra-ui/react";
import { Assistant } from "../../../types/Assistant";
import { Link } from "react-router-dom";

interface AwardCardProps {
  assistant: Assistant;
}

export default function AwardCard({ assistant }: AwardCardProps) {
  return (
    <Link to={`/assistants/${assistant.ID}`}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="sm"
        bg="primary"
        _hover={{ transform: "scale(1.04)" }}
        cursor="pointer"
        width={"full"}
        height={"full"}
        py={8}
        px={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition="transform 0.2s"
      >
        <VStack gap={3} justifyContent="center">
          <Image
            src={assistant.ProfilePicture}
            alt={`${assistant.Initial} profile`}
            borderRadius="full"
            boxSize="80px"
            objectFit="cover"
            boxShadow="lg"
          />
          <VStack gap={2} textAlign="center">
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="secondary"
              maxHeight={16}
              width={"56"}
              truncate
            >
              {assistant.FullName}
            </Text>
            <Badge
              fontSize="xs"
              py={1}
              px={3}
              bg={{ base: "gray.200", _dark: "gray.800" }}
            >
              {assistant.Initial} {assistant.Generation}
            </Badge>
          </VStack>
        </VStack>
      </Box>
    </Link>
  );
}
