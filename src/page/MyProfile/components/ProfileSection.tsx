import { Badge, Box, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { Assistant } from "../../../types/Assistant";
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Button } from "../../../components/ui/button";
import { Field } from "../../../components/ui/field";
import InputField from "../../../components/InputField";
import { useRef } from "react";

interface ProfileProps {
  assistant: Assistant;
}

const socialMediaData = [
  {
    name: "Instagram",
    logo: <FaInstagram color="#E1306C" />,
    link: "https://instagram.com",
    type: "Username",
  },
  {
    name: "LinkedIn",
    logo: <FaLinkedin color="#0077B5" />,
    link: "https://linkedin.com",
    type: "Link",
  },
  {
    name: "GitHub",
    logo: <FaGithub color="#333" />,
    link: "https://github.com",
    type: "Username",
  },
  {
    name: "WhatsApp",
    logo: <FaWhatsapp color="#25D366" />,
    link: "https://wa.me/6289513263889",
    type: "Number",
  },
];

export default function ProfileSection({ assistant }: ProfileProps) {
  const socialMediaRefs = socialMediaData.reduce((refs, media) => {
    refs[media.name] = useRef<HTMLInputElement>(null);
    return refs;
  }, {} as Record<string, React.RefObject<HTMLInputElement>>);

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
              <Badge variant={"plain"} colorScheme="blue" size={"md"}>
                Laboratory Assistant
              </Badge>
            ) : (
              <Badge variant={"plain"} colorScheme="red" size={"md"}>
                Inactive
              </Badge>
            )}
          </Box>
        </Stack>
      </VStack>
      <VStack gap={2} mt={4} width="full">
        {socialMediaData.map((media) => (
          <Field key={media.name} label={`${media.name} (${media.type})`}>
            <InputField
              ref={socialMediaRefs[media.name]}
              placeholder={media.name}
              icon={media.logo}
            />
          </Field>
        ))}
        <Button
          type="submit"
          bg="bluejack.100"
          color="white"
          _hover={{ bg: "bluejack.200" }}
          width="full"
          mt={4}
        >
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
}
