import {
  Box,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuCheckCircle } from "react-icons/lu";
import img1 from "../../../assets/carousel/1.jpg";

export function AboutUsSection() {
  return (
    <Flex
      maxWidth="container.xl"
      mx="auto"
      px={4}
      direction={{ base: "column", md: "row" }}
      alignItems="center"
    >
      <Box flex={1} mb={{ base: 8, md: 0 }}>
        <Image
          src={img1}
          alt="Software Laboratory Center"
          rounded="lg"
          shadow="lg"
          height="40vh"
        />
      </Box>
      <VStack flex={1} alignItems="flex-start" pl={{ md: 12 }}>
        <Heading as="h1" size="xl">
          About SLC
        </Heading>
        <Text color="gray.600">
          The Software Laboratory Center at Bina Nusantara University is a
          dedicated technical service unit focused on teaching software skills
          to students. Our mission is to provide hands-on experience and
          practical knowledge to complement theoretical learning.
        </Text>
        <List.Root>
          {[
            "130+ Laboratory Assistants",
            "Support for Students and Lecturers",
            "Real-world Work Experience",
            "Diverse Team of Undergrad and Graduate Students",
          ].map((item, index) => (
            <ListItem key={index} display="flex" alignItems="center">
              <List.Indicator asChild color="green.500">
                <LuCheckCircle />
              </List.Indicator>
              {/* <ListIcon as={ArrowRight} color="blue.500" /> */}
              <Text color="gray.600">{item}</Text>
            </ListItem>
          ))}
        </List.Root>
      </VStack>
    </Flex>
  );
}
