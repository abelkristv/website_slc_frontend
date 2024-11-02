import {
  Badge,
  Box,
  Flex,
  Image,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Assistant } from "../../../models/Assistant";
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

interface ProfileProps {
  assistant: Assistant;
}

const socialMediaData = [
  {
    name: "Instagram",
    logo: <FaInstagram color="#E1306C" />,
    link: "https://instagram.com",
  },
  {
    name: "LinkedIn",
    logo: <FaLinkedin color="#0077B5" />,
    link: "https://linkedin.com",
  },
  {
    name: "GitHub",
    logo: <FaGithub color="#333" />,
    link: "https://github.com",
  },
  {
    name: "WhatsApp",
    logo: <FaWhatsapp color="#25D366" />,
    link: "https://wa.me/6289513263889",
  },
];

export default function ProfileSection({ assistant }: ProfileProps) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="primary"
      p={4}
    >
      <VStack gap={4}>
        <Image
          src={assistant.ProfilePicture}
          alt={`${assistant.Initial}'s profile`}
          boxSize="150px"
          rounded="full"
          objectFit="cover"
          boxShadow="lg"
          mt={4}
        />
        <Stack align="center">
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="secondary"
            textAlign="center"
          >
            {assistant.FullName}
          </Text>
          <Badge
            fontSize="md"
            py={1}
            px={4}
            bg={{ base: "gray.200", _dark: "gray.800" }}
          >
            {assistant.Initial} {assistant.Generation}
          </Badge>
          <Text fontSize="md" color="gray.500" fontWeight={600}>
            {assistant.Status === "active"
              ? "Laboratory Assistant"
              : "Inactive"}
          </Text>
        </Stack>
      </VStack>
      <VStack gap={2} mt={4} width="full">
        {socialMediaData.map((media) => (
          <Flex
            key={media.name}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="sm"
            bg="card"
            py={2}
            px={6}
            alignItems="center"
            gap={4}
            width="full"
            minHeight={14}
          >
            {media.logo}
            <Link
              href={media.link}
              target="_blank"
              fontSize={"sm"}
              fontWeight={"semibold"}
            >
              Visit {media.name}
            </Link>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
}
