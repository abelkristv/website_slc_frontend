import { VStack, Box, Button, Heading } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function RegistrationSection() {
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
          mb={4}
          textShadow="1px 1px 1px rgba(30, 30, 30, 0.3)"
        >
          Registration
        </Heading>
        <Box
          maxW="700px"
          fontSize="xl"
          px={6}
          textShadow="1px 1px 1px rgba(30, 30, 30, 0.3)"
        >
          Start Date: TBD
          <br />
          End Date: TBD
        </Box>
        <Button
          bg={"bluejack.100"}
          color="white"
          fontSize="lg"
          px={8}
          py={6}
          _hover={{ bg: "bluejack.200" }}
          animation={isInView ? "scale-in 0.6s ease" : ""}
        >
          Register Now
        </Button>
      </VStack>
    </motion.section>
  );
}
