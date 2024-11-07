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
import { Assistant } from "../../../types/Assistant";
import {
  FaGithub,
  FaGlobeAsia,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { SocialMedia } from "../../../types/SocialMedia";

interface ProfileProps {
  assistant: Assistant;
}

const socialMediaData: Array<{
  name: string;
  logo: JSX.Element;
  type: string;
  field: keyof SocialMedia;
}> = [
  {
    name: "Instagram",
    logo: <FaInstagram color="#E1306C" />,
    type: "Username",
    field: "InstagramLink",
  },
  {
    name: "LinkedIn",
    logo: <FaLinkedin color="#0077B5" />,
    type: "Link",
    field: "LinkedInLink",
  },
  {
    name: "GitHub",
    logo: <FaGithub color="#333" />,
    type: "Username",
    field: "GithubLink",
  },
  {
    name: "WhatsApp",
    logo: <FaWhatsapp color="#25D366" />,
    type: "Number",
    field: "WhatsappLink",
  },
  {
    name: "Personal Website",
    logo: <FaGlobeAsia />,
    type: "Link",
    field: "PersonalWebsiteLink",
  },
];

export default function ProfileSection({ assistant }: ProfileProps) {
  const socialMedia: SocialMedia = assistant.SocialMedia || {};
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
          <Box textAlign="center">
            {assistant.Status === "active" ? (
              <Badge variant={"plain"} colorPalette="blue" size={"md"}>
                Laboratory Assistant
              </Badge>
            ) : (
              <Badge variant={"plain"} colorPalette="red" size={"md"}>
                Inactive
              </Badge>
            )}
          </Box>
        </Stack>
      </VStack>
      <VStack gap={2} mt={4} width="full">
        {socialMediaData.map((media) => {
          const socialLink = socialMedia[media.field];

          if (!socialLink) return null;

          const linkHref =
            media.name === "Instagram"
              ? `https://instagram.com/${socialLink}`
              : media.name === "LinkedIn"
              ? socialLink
              : media.name === "GitHub"
              ? `https://github.com/${socialLink}`
              : media.name === "WhatsApp"
              ? `https://wa.me/${socialLink}`
              : media.name === "Personal Website"
              ? `${socialLink}`
              : socialLink;

          return (
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
                href={linkHref}
                target="_blank"
                fontSize={"sm"}
                fontWeight={"semibold"}
              >
                {media.name}
              </Link>
            </Flex>
          );
        })}
      </VStack>
    </Box>
  );
}
