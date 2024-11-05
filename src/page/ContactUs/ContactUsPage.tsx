import { useRef } from "react";
import {
  Button,
  VStack,
  Flex,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaEnvelope, FaUser, FaWhatsapp } from "react-icons/fa";
import InputField from "../../components/InputField";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { loginUser } from "../../services/AuthService";
import { Field } from "../../components/ui/field";
import TextAreaField from "../../components/TextAreaField";

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

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const phone = phoneRef.current?.value || "";
    const message = messageRef.current?.value || "";

    try {
      await loginUser(email, message);
      showSuccessToast("Message sent! We'll contact you soon.");
    } catch (err: any) {
      const errorMessage = err.response?.data.message || "Submission failed";
      showErrorToast(errorMessage);
    }
  };

  return (
    <Flex minHeight="80vh" justifyContent="center" alignItems="center" px={4}>
      <VStack
        as="form"
        onSubmit={handleSubmit}
        width={formWidth}
        maxW="100%"
        px={{ base: 4, md: 8 }}
        py={8}
        borderRadius="lg"
        boxShadow="lg"
        bg="primary"
      >
        <Text fontSize="4xl" fontWeight="bold" textAlign="center">
          Contact Us
        </Text>
        <Text
          fontSize={{ base: "sm", md: "md" }}
          color="gray.500"
          textAlign="center"
        >
          Fill out the form below. We will reach out to you as soon as possible.
        </Text>

        <Field label="Full Name" required mt={4}>
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
          mt={4}
        >
          Submit
        </Button>
      </VStack>
    </Flex>
  );
}
