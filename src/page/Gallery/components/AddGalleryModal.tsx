import { useRef, useState } from "react";
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
  Box,
  FileUploadFileChangeDetails,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  showErrorToast,
  showSuccessToast,
  showWaringToast,
} from "../../../utils/toastUtils";
import { convertFilesToBase64 } from "../../../utils/imageUtils";
import { FaUser } from "react-icons/fa";
import { createGallery } from "../../../services/GalleryService";
import { useUser } from "../../../contexts/UserContext";
import { FiPlus } from "react-icons/fi";

interface AddGalleryModalProps {
  fetchData: () => void;
}

export default function AddGalleryModal({ fetchData }: AddGalleryModalProps) {
  const [open, setOpen] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const handleFileChange = (details: FileUploadFileChangeDetails) => {
    setImages(details.acceptedFiles);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    const title = titleRef.current?.value || "";

    if (!title || images.length === 0) {
      showErrorToast("All fields are required.");
      return;
    }

    setIsLoading(true);

    try {
      const base64Images = await convertFilesToBase64(images);

      const gallery = {
        GalleryTitle: title,
        GalleryImages: base64Images,
      };

      await createGallery(gallery);
      if (
        user?.Assistant.SLCPosition.PositionName ===
        "Operations Management Officer"
      ) {
        showSuccessToast("Gallery added successfully");
      } else {
        showWaringToast("Gallery is pending for approval");
      }
      setOpen(false);
      fetchData();
    } catch (err: any) {
      const errorMessage = err.response?.data.message || "Submission failed";
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
      scrollBehavior={"inside"}
    >
      <DialogTrigger asChild>
        <Button
          position={"absolute"}
          right={0}
          top={0}
          transform={"translateY(20%)"}
          bg={"white"}
          _hover={{ bg: "gray.100" }}
          color={"black"}
          size={{ base: "sm", md: "md" }}
        >
          Add Gallery
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Gallery</DialogTitle>
        </DialogHeader>
        <DialogBody
          display={"flex"}
          flexDir={"column"}
          gap={4}
          as={"form"}
          onSubmit={handleSubmit}
        >
          <Field label="Gallery Title" required>
            <InputField
              ref={titleRef}
              placeholder="Gallery Title"
              icon={<FaUser color="gray.300" />}
            />
          </Field>
          <Field label="Gallery Images" required>
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
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
