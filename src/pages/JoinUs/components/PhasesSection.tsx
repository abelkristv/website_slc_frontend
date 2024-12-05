import { Grid, Flex, Box, Heading, VStack } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { FaUserPlus } from "react-icons/fa";

const phases = [
  {
    title: "Initial Test",
    text: (
      <>
        <p>Aptitude Test</p>
        <p>Programming Test</p>
      </>
    ),
  },
  {
    title: "Pre Training",
    text: (
      <>
        <p>Data Structures</p>
        <p>Object Oriented Programming</p>
        <p>Database</p>
      </>
    ),
  },
  {
    title: "Interview",
    text: (
      <>
        <p>Resume</p>
        <p>Presentation</p>
      </>
    ),
  },
  {
    title: "Core Training",
    text: (
      <>
        <p>Learning Session</p>
        <p>Case Solving</p>
        <p>Presentation</p>
        <p>Evaluation</p>
      </>
    ),
  },
];

export default function PhasesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.section
      ref={ref}
      style={{
        scrollSnapAlign: "start",
        margin: "0 0 50% 0",
        scrollBehavior: "smooth",
        scrollSnapType: "y mandatory",
      }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      <VStack
        justifyContent="center"
        alignItems="center"
        gap={5}
        textAlign="center"
        minHeight="91.5vh"
        style={{ translate: "0 -2rem" }}
        pt={{ base: 20, lg: 0 }}
        pb={{ base: 12, lg: 0 }}
        px={{ base: 4, lg: 8 }}
      >
        <Heading
          fontSize={{ base: "4xl", lg: "6xl" }}
          fontWeight="bold"
          mb={{ base: 0, lg: 6 }}
          textShadow="1px 1px 1px rgba(30, 30, 30, 0.3)"
          animation={isInView ? `slide-from-top-full 0.8s ease` : ""}
        >
          Phases
        </Heading>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={6}
          maxW="1280px"
        >
          {phases.map((item, index) => (
            <Flex
              key={index}
              bg="card"
              borderRadius="md"
              px={6}
              pt={8}
              pb={4}
              mt={4}
              boxShadow="lg"
              direction="column"
              align="center"
              transition="transform 0.2s, box-shadow 0.2s"
              cursor={"default"}
              height={"100%"}
              animation={
                isInView
                  ? `slide-from-bottom-full ${index * 0.05 + 0.8}s ease`
                  : ""
              }
              _hover={{
                transform: "translateY(-5%)",
                boxShadow: "xl",
              }}
            >
              <Box
                fontSize={{ base: "4xl", md: "6xl" }}
                mb={4}
                color={"white"}
                bgColor={"bluejack.100"}
                width={{ base: "75px", md: "100px" }}
                height={{ base: "75px", md: "100px" }}
                rounded={"full"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                fontWeight={"bold"}
              >
                <Box
                  fontSize={{ base: "4xl", md: "6xl" }}
                  color={"secondary"}
                  bgColor={"card"}
                  width={{ base: "55px", md: "75px" }}
                  height={{ base: "55px", md: "75px" }}
                  rounded={"full"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  fontWeight={"bold"}
                >
                  {index + 1}
                </Box>
              </Box>
              <Heading
                fontSize="2xl"
                fontWeight="bold"
                mb={3}
                color={"secondary"}
              >
                {item.title}
              </Heading>
              <Box fontSize="lg" color={"secondary"}>
                {item.text}
              </Box>
              {index === 0 && (
                <Link to="https://bluejack.binus.ac.id/nar/" target="_blank">
                  <Button
                    variant="solid"
                    color="white"
                    rounded="md"
                    size={"sm"}
                    bg="bluejack.100"
                    _hover={{ bg: "bluejack.200" }}
                    mt={5}
                  >
                    <FaUserPlus />
                    <Box as="span" ml={1}>
                      Join Us
                    </Box>
                  </Button>
                </Link>
              )}
            </Flex>
          ))}
        </Grid>
      </VStack>
    </motion.section>
  );
}
