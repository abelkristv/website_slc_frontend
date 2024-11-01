import { Box, Image, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogBody,
  DialogCloseTrigger,
} from "../../../components/ui/dialog";

const awards = [
  {
    id: 1,
    title: "Best Performing Assistant",
    semester: "Odd Semester 2023/2024",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/linkasa-a354b.appspot.com/o/awards.png?alt=media&token=0a70d657-3415-49b8-86d7-05ef101cfcc2",
  },
  {
    id: 2,
    title: "Best Test Progressive Assistant",
    semester: "Even Semester 2023/2024",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/linkasa-a354b.appspot.com/o/besttpa.png?alt=media&token=e398fed0-18fb-4223-8687-c848138b2c99",
  },
];

export default function AwardsSection() {
  const [selectedImage, setSelectedImage] = useState("");

  return (
    <Box
      mb={8}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      width="100%"
      p={8}
    >
      <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={4}>
        Awards
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={4}>
        {awards.map((award) => (
          <DialogRoot key={award.id} size={"xl"}>
            <DialogTrigger asChild>
              <Box
                position="relative"
                borderWidth="1px"
                borderRadius="lg"
                bg="gray.50"
                shadow="xs"
                overflow="hidden"
                onClick={() => setSelectedImage(award.imageUrl)}
                cursor="pointer"
              >
                <Image
                  src={award.imageUrl}
                  w="100%"
                  h="300px"
                  objectFit="cover"
                  borderTopRadius="lg"
                />
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  w="100%"
                  h="300px"
                  bg="black"
                  opacity="0"
                  transition="opacity 0.3s ease"
                  _hover={{ opacity: "0.2" }}
                />
                <VStack
                  align="start"
                  p={4}
                  gap={1}
                  position="relative"
                  zIndex={1}
                >
                  <Text fontSize="md" fontWeight="bold" color="gray.700">
                    {award.title}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {award.semester}
                  </Text>
                </VStack>
              </Box>
            </DialogTrigger>
            <DialogContent>
              <DialogBody p={0}>
                <Image
                  src={selectedImage}
                  w="100%"
                  h="100%"
                  objectFit="contain"
                />
              </DialogBody>
              <DialogCloseTrigger color={"white"} bgColor={"transparent"} />
            </DialogContent>
          </DialogRoot>
        ))}
      </SimpleGrid>
    </Box>
  );
}
