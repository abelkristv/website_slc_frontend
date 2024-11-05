import { Grid, Flex, Box, Heading, VStack } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { FaInstagram, FaLine, FaYoutube, FaFacebook } from "react-icons/fa";
import { useRef } from "react";
import { Link } from "react-router-dom";

const links = [
  {
    title: "Instagram",
    text: "@slcbinusuniv",
    icon: <FaInstagram color="#E1306C" />,
    link: "https://www.instagram.com/slcbinusuniv/",
  },
  {
    title: "LINE",
    text: "@813ayzfv",
    icon: <FaLine color="#00B900" />,
    link: "https://line.me/R/ti/p/%40813ayzfv",
  },
  {
    title: "Youtube",
    text: "SLC Software Laboratory Center",
    icon: <FaYoutube color="#FF0000" />,
    link: "https://www.youtube.com/@slcbinusuniv",
  },
  {
    title: "Facebook",
    text: "SLC Binus University",
    icon: <FaFacebook color="#3b5998" />,
    link: "https://www.facebook.com/slcbinusuniv/",
  },
];

export default function MoreInformationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.section
      ref={ref}
      style={{
        scrollSnapAlign: "start",
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
          fontSize={{ base: "5xl", lg: "6xl" }}
          fontWeight="bold"
          mb={6}
          textShadow="1px 1px 1px rgba(30, 30, 30, 0.3)"
        >
          More Information
        </Heading>
        <Box
          maxW="700px"
          fontSize={{ base: "lg", lg: "xl" }}
          px={6}
          textShadow="1px 1px 1px rgba(30, 30, 30, 0.3)"
        >
          <p>DM Instagram / Chat LINE Official Account</p>
          <p>KMG - Gabriel / Rico / Vito</p>
          <p>[021] 5345830 ext 1762 - Room 724</p>
        </Box>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={{ base: 4, md: 6 }}
          maxW="1280px"
        >
          {links.map((link, index) => (
            <Link to={link.link} target="_blank" key={index}>
              <Flex
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
                animation={
                  isInView
                    ? `slide-from-left-full ${index * 0.05 + 0.6}s ease`
                    : ""
                }
                cursor={"pointer"}
                height={"100%"}
                _hover={{
                  transform: "translateY(-5%)",
                  boxShadow: "xl",
                }}
              >
                <Box fontSize={"6xl"} mb={4}>
                  {link.icon}
                </Box>
                <Heading
                  fontSize="2xl"
                  fontWeight="bold"
                  mb={3}
                  color={"secondary"}
                >
                  {link.title}
                </Heading>
                <Box fontSize="lg" color={"secondary"}>
                  {link.text}
                </Box>
              </Flex>
            </Link>
          ))}
        </Grid>
      </VStack>
    </motion.section>
  );
}
