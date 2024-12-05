import { useEffect, useRef, useState } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Field } from "../../../components/ui/field";
import InputField from "../../../components/InputField";
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "../../../components/ui/file-button";
import {
  FileUploadFileChangeDetails,
  Spinner,
  VStack,
  Flex,
  IconButton,
  Image,
} from "@chakra-ui/react";
import {
  showErrorToast,
  showSuccessToast,
  showWaringToast,
} from "../../../utils/toastUtils";
import { convertFilesToBase64 } from "../../../utils/imageUtils";
import { updateGallery } from "../../../services/GalleryService";
import { Gallery } from "../../../types/Gallery";
import { LuTrash, LuPencil } from "react-icons/lu";
import { useUser } from "../../../contexts/UserContext";

interface UpdateGalleryModalProps {
  gallery: Gallery;
  fetchData: () => void;
}

export default function UpdateGalleryModal({
  gallery,
  fetchData,
}: UpdateGalleryModalProps) {
  const [open, setOpen] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.value = gallery.GalleryTitle || "";
        setExistingImages(gallery.GalleryImages || []);
      }
    }, 0);
  }, [gallery, open]);

  const handleFileChange = (details: FileUploadFileChangeDetails) => {
    setImages(details.acceptedFiles);
  };

  const handleDeleteExistingImage = (image: string) => {
    setExistingImages((prev) => prev.filter((img) => img !== image));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    const title = titleRef.current?.value || "";

    if (!title || (images.length === 0 && existingImages.length === 0)) {
      showErrorToast("All fields are required.");
      return;
    }

    setIsLoading(true);

    try {
      const base64Images = await convertFilesToBase64(images);

      const updatedGallery = {
        ID: gallery.ID,
        GalleryTitle: title,
        GalleryImages: [...existingImages, ...base64Images],
      };

      await updateGallery(updatedGallery);
      if (
        user?.Assistant.SLCPosition.PositionName ===
        "Operations Management Officer"
      ) {
        showSuccessToast("Gallery updated successfully");
      } else {
        showWaringToast("Gallery is pending for approval");
      }
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
          position="absolute"
          top={2}
          right="2.9rem"
          variant="surface"
          size="sm"
          zIndex={10}
        >
          <LuPencil />
        </IconButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Gallery</DialogTitle>
        </DialogHeader>
        <DialogBody
          as="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDir="column"
          gap={4}
        >
          <Field label="Gallery Title" required>
            <InputField ref={titleRef} placeholder="Gallery Title" />
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
                    <Image
                      src={image}
                      width={"full"}
                      height={"auto"}
                      aspectRatio={"1/1"}
                    ></Image>
                    <IconButton
                      rounded="full"
                      position="absolute"
                      top={2}
                      right={2}
                      variant="surface"
                      size="sm"
                      onClick={() => handleDeleteExistingImage(image)}
                    >
                      <LuTrash />
                    </IconButton>
                  </Flex>
                ))}
              </VStack>
            </Field>
          )}

          <Field label="Add Gallery Images">
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
