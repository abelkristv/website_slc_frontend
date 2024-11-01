import { Badge, Box, Image, Stack, Text, VStack, Link } from "@chakra-ui/react";
import { Assistant } from "../../../models/Assistant";
import {
  ClipboardIconButton,
  ClipboardInput,
  ClipboardLabel,
  ClipboardRoot,
} from "../../../components/ui/clipboard";
import { InputGroup } from "../../../components/ui/input-group";

interface SocialMediaProps {
  assistant: Assistant;
}

const socialMediaData = [
  {
    name: "Instagram",
    logo: "https://via.placeholder.com/30",
    link: "https://instagram.com",
  },
  {
    name: "LinkedIn",
    logo: "https://via.placeholder.com/30",
    link: "https://linkedin.com",
  },
  {
    name: "GitHub",
    logo: "https://via.placeholder.com/30",
    link: "https://github.com",
  },
  {
    name: "Line",
    logo: "https://via.placeholder.com/30",
    contact: "line_user_id",
  },
  {
    name: "WhatsApp",
    logo: "https://via.placeholder.com/30",
    contact: "+1234567890",
  },
];

export default function SocialMediaSection({ assistant }: SocialMediaProps) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      p={8}
    >
      <VStack gap={4}>
        {socialMediaData.map((media) => (
          <Stack key={media.name} direction="row" alignItems="center">
            <Image src={media.logo} alt={`${media.name} logo`} boxSize="30px" />
            <Text>{media.name}</Text>
            {media.link ? (
              <Link href={media.link}>Visit</Link>
            ) : (
              <ClipboardRoot maxW="300px" value={media.contact}>
                <ClipboardLabel>{media.name} Contact</ClipboardLabel>
                <InputGroup
                  width="full"
                  endElement={<ClipboardIconButton me="-2" />}
                >
                  <ClipboardInput />
                </InputGroup>
              </ClipboardRoot>
            )}
          </Stack>
        ))}
      </VStack>
    </Box>
  );
}
