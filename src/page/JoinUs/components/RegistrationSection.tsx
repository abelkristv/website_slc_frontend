import { Grid, Flex, Box, Heading, VStack } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";

const phases = [
  {
    title: "Initial Test",
    text: (
      <>
        <p>Aptitude Test</p>
        <p>Programming Test</p>
      </>
    ),
    animation: "slide-from-right-full 0.6s",
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
    animation: "slide-from-right-full 0.8s",
  },
  {
    title: "Interview",
    text: (
      <>
        <p>Resume</p>
        <p>Presentation</p>
      </>
    ),
    animation: "slide-from-right-full 1s",
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
    animation: "slide-from-right-full 1.2s",
  },
];

export default function RegistrationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.section
      ref={ref}
      style={{
        scrollSnapAlign: "start",
        margin: "0 0 25% 0",
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
      >
        <Heading
          fontSize="6xl"
          fontWeight="bold"
          mb={5}
          textShadow="1px 1px 1px rgba(30, 30, 30, 0.3)"
        >
          Phases
        </Heading>
        <Grid
          templateColumns="repeat(auto-fit, minmax(240px, 1fr))"
          gap={6}
          maxW="1280px"
        >
          {phases.map((item, i) => (
            <Flex
              key={i}
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
              animation={isInView ? item.animation : ""}
              _hover={{
                transform: "translateY(-5%)",
                boxShadow: "xl",
              }}
            >
              <Box
                fontSize={"6xl"}
                mb={4}
                color={"white"}
                bgColor={"bluejack.100"}
                width={"100px"}
                height={"100px"}
                rounded={"full"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                fontWeight={"bold"}
              >
                {i + 1}
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
              {i === 0 && (
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
                    <Box as="span" ml={1}>
                      Register
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
