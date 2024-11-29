import { useRef, useState } from "react";
import {
  Button,
  VStack,
  Flex,
  Text,
  useBreakpointValue,
  Spinner,
  FileUploadFileChangeDetails,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { showErrorToast, showSuccessToast } from "../../../utils/toastUtils";
import { Field } from "../../../components/ui/field";
import InputField from "../../../components/InputField";
import TextAreaField from "../../../components/TextAreaField";
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "../../../components/ui/file-button";
import { createNews } from "../../../services/NewsService";
import { convertFilesToBase64 } from "../../../utils/imageUtils";
import { useNavigate } from "react-router";

export default function AddNewsPage() {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const formWidth = useBreakpointValue({
    base: "100%",
    md: "80%",
    lg: "600px",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const navigate = useNavigate();

  const handleFileChange = (details: FileUploadFileChangeDetails) => {
    setImages(details.acceptedFiles);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    const title = titleRef.current?.value || "";
    const description = descriptionRef.current?.value || "";

    if (!title || !description || images.length === 0) {
      showErrorToast("All fields are required.");
      return;
    }

    setIsLoading(true);

    try {
      const base64Images = await convertFilesToBase64(images);

      const news = {
        NewsTitle: title,
        NewsDescription: description,
        NewsImages: base64Images,
      };

      await createNews(news);
      showSuccessToast("News added successfully");
      navigate("/news");
    } catch (err: any) {
      const errorMessage = err.response?.data.message || "Submission failed";
      showErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
      >
        <Text fontSize="4xl" fontWeight="bold" color="bluejack.100">
          Add News
        </Text>

        <Field label="News Title" required>
          <InputField
            ref={titleRef}
            placeholder="News Title"
            icon={<FaUser color="gray.300" />}
          />
        </Field>
        <Field label="News Description" required>
          <TextAreaField
            ref={descriptionRef}
            placeholder="News description..."
          />
        </Field>
        <Field label="News Image" required>
          <FileUploadRoot
            maxW="xl"
            alignItems="stretch"
            maxFiles={10}
            onFileChange={handleFileChange}
            bg="primary"
            accept={["image/png", "image/jpeg"]}
          >
            <FileUploadList bg="primary" clearable />
            <FileUploadDropzone
              label="Drag and drop here to upload"
              description=".png, .jpg up to 5MB"
              bg="primary"
              cursor={"pointer"}
            />
          </FileUploadRoot>
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
          {isLoading ? (
            <Spinner borderWidth={"3px"} size={"sm"} animationDuration="1s" />
          ) : (
            ""
          )}
          Submit
        </Button>
      </VStack>
    </Flex>
  );
}
