import {
  Badge,
  Box,
  Flex,
  Image,
  Link,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Assistant } from "../../../types/Assistant";
import { SocialMedia } from "../../../types/SocialMedia";
import { socialMediaData } from "./data/socialMediaData";
import { useRef, useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import { Field } from "../../../components/ui/field";
import InputField from "../../../components/InputField";
import { updateSocialMedia } from "../../../services/SocialMediaService";
import { showErrorToast, showSuccessToast } from "../../../utils/toastUtils";
import { Button } from "../../../components/ui/button";

interface ProfileProps {
  assistant: Assistant;
  fetchAssistant: () => void;
}

export default function ProfileSection({
  assistant,
  fetchAssistant,
}: ProfileProps) {
  const socialMedia: SocialMedia = assistant.SocialMedia || {};
  const socialMediaRefs = socialMediaData.reduce((refs, media) => {
    refs[media.name] = useRef<HTMLInputElement>(null);
    return refs;
  }, {} as Record<string, React.RefObject<HTMLInputElement>>);

  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const handleSubmit = async () => {
    const socialMedia: SocialMedia = {
      InstagramLink: socialMediaRefs["Instagram"].current?.value,
      LinkedInLink: socialMediaRefs["LinkedIn"].current?.value,
      GithubLink: socialMediaRefs["GitHub"].current?.value,
      WhatsappLink: socialMediaRefs["WhatsApp"].current?.value,
      PersonalWebsiteLink: socialMediaRefs["Personal Website"].current?.value,
    };

    setIsLoading(true);

    try {
      await updateSocialMedia(socialMedia);
      await fetchAssistant();
      showSuccessToast("Social media links updated successfully");
    } catch (error: any) {
      console.error("Failed to update social media links:", error);
      showErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };
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
              <Badge variant={"plain"} color={"bluejack.200"} size={"md"}>
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
      {assistant.ID === user?.Assistant.ID ? (
        <VStack gap={4} mt={4} width="full">
          {socialMediaData.map((media) => (
            <Field key={media.name} label={`${media.name}`}>
              <InputField
                value={socialMedia[media.field]}
                ref={socialMediaRefs[media.name]}
                placeholder={media.placeholder}
                icon={media.logo}
              />
            </Field>
          ))}
          <Button
            type="button"
            onClick={handleSubmit}
            bg="bluejack.100"
            _hover={{ bg: "bluejack.200" }}
            width="full"
            disabled={isLoading}
            color={"white"}
          >
            {isLoading ? (
              <Spinner borderWidth={"3px"} size={"sm"} animationDuration="1s" />
            ) : (
              ""
            )}
            Save Changes
          </Button>
        </VStack>
      ) : (
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
      )}
    </Box>
  );
}
