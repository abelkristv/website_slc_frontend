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
      style={{ scrollSnapAlign: "start" }}
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
          Requirements
        </Heading>
        <Grid
          templateColumns="repeat(auto-fit, minmax(240px, 1fr))"
          gap={6}
          maxW="1280px"
        >
          {requirements.map((item, i) => (
            <Flex
              key={i}
              bg="card"
              borderRadius="md"
              px={6}
              py={8}
              mt={4}
              boxShadow="lg"
              direction="column"
              align="center"
              justifyContent={"center"}
              transition="transform 0.2s, box-shadow 0.2s"
              cursor={"default"}
              height={"100%"}
              animation={isInView ? item.animation : ""}
              _hover={{
                transform: "translateY(-5%)",
                boxShadow: "xl",
              }}
            >
              <Box fontSize={"6xl"} mb={4} color={"bluejack.100"}>
                {item.icon}
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
            </Flex>
          ))}
        </Grid>
      </VStack>
    </motion.section>
  );
}
