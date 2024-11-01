import {
  Badge,
  Box,
  Flex,
  Image,
  Link,
  Stack,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { Assistant } from "../../../models/Assistant";
import {
  ClipboardIconButton,
  ClipboardInput,
  ClipboardRoot,
} from "../../../components/ui/clipboard";
import { InputGroup } from "../../../components/ui/input-group";
import {
  FaGithub,
  FaInstagram,
  FaLine,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

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
    name: "Line",
    logo: <FaLine color="#00C300" />,
    contact: "line_user_id",
  },
  {
    name: "WhatsApp",
    logo: <FaWhatsapp color="#25D366" />,
    contact: "089513263889",
  },
];

export default function ProfileSection({ assistant }: ProfileProps) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
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
            color="gray.700"
            textAlign="center"
          >
            {assistant.FullName}
          </Text>
          <Badge fontSize="md" py={1} px={4} colorScheme="blue">
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
            bg="gray.50"
            py={2}
            px={6}
            alignItems="center"
            gap={4}
            width="full"
            minHeight={14}
          >
            {media.logo}
            {media.link ? (
              <Link
                href={media.link}
                target="_blank"
                fontSize={"sm"}
                fontWeight={"semibold"}
              >
                Visit {media.name}
              </Link>
            ) : (
              <ClipboardRoot value={media.contact}>
                <InputGroup
                  backgroundColor={"white"}
                  width="full"
                  endElement={<ClipboardIconButton backgroundColor={"white"} />}
                >
                  <ClipboardInput
                    placeholder={`Copy ${media.name} ID`}
                    backgroundColor={"white"}
                  />
                </InputGroup>
              </ClipboardRoot>
            )}
          </Flex>
        ))}
      </VStack>
    </Box>
  );
}
