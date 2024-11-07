import { useRef, useState } from "react";
import {
  Button,
  VStack,
  Flex,
  Text,
  useBreakpointValue,
  Box,
  Spinner,
} from "@chakra-ui/react";
import {
  FaEnvelope,
  FaUser,
  FaWhatsapp,
  FaRegCheckCircle,
} from "react-icons/fa";
import InputField from "../../components/InputField";
import { showErrorToast } from "../../utils/toastUtils";
import { Field } from "../../components/ui/field";
import TextAreaField from "../../components/TextAreaField";
import { createContactUs } from "../../services/ContactUsService";
import { useNavigate } from "react-router";

export default function ContactUsPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const formWidth = useBreakpointValue({
    base: "100%",
    md: "80%",
    lg: "600px",
  });
  const navigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    const ContactUs = {
      Name: nameRef.current?.value || "",
      Email: emailRef.current?.value || "",
      Phone: phoneRef.current?.value || "",
      Message: messageRef.current?.value || "",
    };

    setIsLoading(true);

    try {
      await createContactUs(ContactUs);
      setIsSubmitted(true);
    } catch (err: any) {
      const errorMessage = err.response?.data.message || "Submission failed";
      showErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Flex minHeight="80vh" justifyContent="center" alignItems="center" px={4}>
      <VStack
        as="form"
        onSubmit={handleSubmit}
        width={formWidth}
        maxW="100%"
        px={{ base: 6, md: 8 }}
        py={10}
        borderRadius="lg"
        boxShadow="xl"
        bg="primary"
        gap={4}
      >
        {!isSubmitted ? (
          <>
            <Text fontSize="4xl" fontWeight="bold" color="bluejack.100">
              Contact Us
            </Text>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.500"
              textAlign="center"
            >
              Fill out the form below and we'll reach out to you as soon as
              possible.
            </Text>

            <Field label="Full Name" required>
              <InputField
                ref={nameRef}
                placeholder="Full Name"
                icon={<FaUser color="gray.300" />}
              />
            </Field>
            <Field label="Email Address" required>
              <InputField
                ref={emailRef}
                placeholder="Email Address"
                icon={<FaEnvelope color="gray.300" />}
              />
            </Field>
            <Field label="WhatsApp Number" required>
              <InputField
                ref={phoneRef}
                placeholder="WhatsApp Number"
                icon={<FaWhatsapp color="gray.300" />}
              />
            </Field>
            <Field label="Message" required>
              <TextAreaField ref={messageRef} placeholder="Your message..." />
            </Field>
            <Button
              type="submit"
              bg="bluejack.100"
              color="white"
              _hover={{ bg: "bluejack.200" }}
              width="full"
              mt={6}
              disabled={isLoading}
            >
              {isLoading ? <Spinner size="sm" color="white" /> : "Submit"}
            </Button>
          </>
        ) : (
          <>
            <Box fontSize={"3rem"} color={"green.500"}>
              <FaRegCheckCircle />
            </Box>

            <Text fontSize="2xl" fontWeight="bold" textAlign="center">
              Message Sent!
            </Text>
            <Text textAlign="center" mb={4}>
              Thank you for contacting us. We'll get back to you soon.
            </Text>
            <Button
              onClick={handleBackToHome}
              bg="bluejack.100"
              color="white"
              _hover={{ bg: "bluejack.200" }}
            >
              Back to Home
            </Button>
          </>
        )}
      </VStack>
    </Flex>
  );
}
