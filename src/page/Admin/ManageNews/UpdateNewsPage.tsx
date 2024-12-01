import { useEffect, useRef, useState } from "react";
import {
  Button,
  VStack,
  Flex,
  Text,
  useBreakpointValue,
  Spinner,
  IconButton,
  FileUploadFileChangeDetails,
  Image,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../utils/toastUtils";
import { Field } from "../../../components/ui/field";
import InputField from "../../../components/InputField";
import TextAreaField from "../../../components/TextAreaField";
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "../../../components/ui/file-button";
import { getNewsById, updateNews } from "../../../services/NewsService";
import { convertFilesToBase64 } from "../../../utils/imageUtils";
import { LuTrash } from "react-icons/lu";

export default function UpdateNewsPage() {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const formWidth = useBreakpointValue({
    base: "100%",
    md: "80%",
    lg: "600px",
  });

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const news = await getNewsById(id!);
        titleRef.current!.value = news.NewsTitle;
        descriptionRef.current!.value = news.NewsDescription;
        setExistingImages(news.NewsImages || []);
      } catch (err: any) {
        showErrorToast(
          err.response?.data.message || "Failed to load news details"
        );
      }
    };
    fetchNews();
  }, [id]);

  const handleFileChange = (details: FileUploadFileChangeDetails) => {
    setImages(details.acceptedFiles);
  };

  const handleDeleteExistingImage = (image: string) => {
    setExistingImages((prev) => prev.filter((img) => img !== image));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    const title = titleRef.current?.value || "";
    const description = descriptionRef.current?.value || "";

    if (
      !title ||
      !description ||
      (images.length === 0 && existingImages.length === 0)
    ) {
      showErrorToast("All fields are required.");
      return;
    }

    setIsLoading(true);

    try {
      const base64Images = await convertFilesToBase64(images);

      const updatedNews = {
        ID: parseInt(id!),
        NewsTitle: title,
        NewsDescription: description,
        NewsImages: [...existingImages, ...base64Images],
      };

      await updateNews(updatedNews);
      showSuccessToast("News updated successfully");
      navigate("/admin/manage-news");
    } catch (err: any) {
      const errorMessage = err.response?.data.message || "Update failed";
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
        gap={4}
      >
        <Text fontSize="4xl" fontWeight="bold" color="bluejack.100">
          Update News
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
            minHeight={80}
          />
        </Field>
        {existingImages.length > 0 && (
          <Field label="Existing Images">
            <VStack gap={4} width="full">
              {existingImages.map((image, index) => (
                <Flex
                  key={index}
                  alignItems="center"
                  justifyContent="space-between"
                  width="full"
                  position="relative"
                >
                  <Image src={image}></Image>
                  <IconButton
                    rounded="full"
                    position={"absolute"}
                    top={2}
                    right={2}
                    variant={"surface"}
                    size={"sm"}
                    onClick={() => handleDeleteExistingImage(image)}
                  >
                    <LuTrash />
                  </IconButton>
                </Flex>
              ))}
            </VStack>
          </Field>
        )}

        <Field label="Add News Images">
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
