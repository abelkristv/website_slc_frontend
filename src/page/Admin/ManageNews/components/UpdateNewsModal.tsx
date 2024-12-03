import { useEffect, useRef, useState } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import {
  Button,
  VStack,
  Flex,
  IconButton,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { LuTrash, LuPencil } from "react-icons/lu";
import { Field } from "../../../../components/ui/field";
import InputField from "../../../../components/InputField";
import TextAreaField from "../../../../components/TextAreaField";
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "../../../../components/ui/file-button";
import { updateNews } from "../../../../services/NewsService";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastUtils";
import { convertFilesToBase64 } from "../../../../utils/imageUtils";
import { News } from "../../../../types/News";

interface UpdateNewsModalProps {
  news: News;
  fetchData: () => void;
}

export default function UpdateNewsModal({
  news,
  fetchData,
}: UpdateNewsModalProps) {
  const [open, setOpen] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      if (titleRef.current && descriptionRef.current) {
        titleRef.current.value = news.NewsTitle;
        descriptionRef.current.value = news.NewsDescription;
        setExistingImages(news.NewsImages || []);
      }
    }, 0);
  }, [news, open]);

  const handleFileChange = (details: any) => {
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
        ID: news.ID,
        NewsTitle: title,
        NewsDescription: description,
        NewsImages: [...existingImages, ...base64Images],
      };

      await updateNews(updatedNews);
      showSuccessToast("News updated successfully");
      setOpen(false);
      fetchData();
    } catch (err: any) {
      const errorMessage = err.response?.data.message || "Update failed";
      showErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogRoot
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      scrollBehavior="inside"
    >
      <DialogTrigger asChild>
        <IconButton
          rounded="full"
          position={"absolute"}
          top={2}
          right={"2.9rem"}
          variant={"surface"}
          size={"sm"}
        >
          <LuPencil />
        </IconButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update News</DialogTitle>
        </DialogHeader>
        <DialogBody
          as="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDir="column"
          gap={4}
        >
          <Field label="News Title" required>
            <InputField ref={titleRef} placeholder="News Title" />
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
                cursor="pointer"
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
              <Spinner borderWidth="3px" size="sm" animationDuration="1s" />
            ) : (
              "Submit"
            )}
          </Button>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
