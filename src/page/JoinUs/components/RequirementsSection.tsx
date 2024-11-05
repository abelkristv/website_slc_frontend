import { Grid, Flex, Box, Heading, VStack } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { FaUserGraduate, FaFileContract, FaUniversity } from "react-icons/fa";
import { GrScorecard } from "react-icons/gr";
import { useRef } from "react";

const requirements = [
  {
    title: "Binusian",
    text: "Must be an active student of Binus University",
    icon: <FaUserGraduate />,
    animation: "slide-from-bottom-full 0.6s",
  },
  {
    title: "Contract",
    text: "Must be willing to sign a contract for 2 years",
    icon: <FaFileContract />,
    animation: "slide-from-bottom-full 0.8s",
  },
  {
    title: "Grade",
    text: "Minimum Grade B in Algorithm and Programming",
    icon: <GrScorecard />,
    animation: "slide-from-bottom-full 1s",
  },
  {
    title: "Majors",
    text: (
      <>
        <p>Computer Science</p>
        <p>Information System</p>
        <p>Double Program</p>
        <p>Master Track Program</p>
      </>
    ),
    icon: <FaUniversity />,
    animation: "slide-from-bottom-full 1.2s",
  },
];

export default function RequirementsSection() {
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
        gap={6}
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
        >
          Requirements
        </Heading>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={{ base: 4, md: 6 }}
          maxW="1280px"
          w="full"
        >
          {requirements.map((item, i) => (
            <Flex
              key={i}
              bg="card"
              borderRadius="md"
              px={{ base: 4, md: 6 }}
              py={{ base: 6, md: 8 }}
              mt={4}
              boxShadow="lg"
              direction="column"
              align="center"
              justifyContent="center"
              transition="transform 0.2s, box-shadow 0.2s"
              cursor="default"
              height="100%"
              animation={isInView ? item.animation : ""}
              _hover={{
                transform: "translateY(-5%)",
                boxShadow: "xl",
              }}
            >
              <Box
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                mb={4}
                color="bluejack.100"
              >
                {item.icon}
              </Box>
              <Heading
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="bold"
                mb={3}
                color="secondary"
              >
                {item.title}
              </Heading>
              <Box fontSize={{ base: "md", md: "lg" }} color="secondary">
                {item.text}
              </Box>
            </Flex>
          ))}
        </Grid>
      </VStack>
    </motion.section>
  );
}
