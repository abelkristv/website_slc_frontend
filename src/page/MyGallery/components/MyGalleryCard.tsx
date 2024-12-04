import {
  Badge,
  Box,
  DialogHeader,
  DialogRoot,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Gallery } from "../../../types/Gallery";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import GalleryCardSlider from "../../../components/GalleryCardSlider";
import { Avatar } from "../../../components/ui/avatar";
import { formatDate } from "../../../utils/dateUtils";
import GalleryDetailSlider from "../../../components/GalleryDetailSlider";
import UpdateGalleryModal from "./UpdateGalleryModal";
import DeleteGalleryModal from "./DeleteGalleryModal";

interface MyGalleryCardProps {
  gallery: Gallery;
  delay?: number;
  vertical?: boolean;
  rtl?: boolean;
  showStatus?: boolean;
  fetchData: () => void;
}

export default function MyGalleryCard({
  gallery,
  delay,
  vertical,
  rtl,
  showStatus = false,
  fetchData,
}: MyGalleryCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Box position={"relative"}>
      {" "}
      <DialogRoot
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        scrollBehavior={"inside"}
        lazyMount
        size={"lg"}
      >
        <UpdateGalleryModal gallery={gallery} fetchData={fetchData} />
        <DeleteGalleryModal galleryId={gallery.ID!} fetchData={fetchData} />
        <DialogTrigger asChild>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="sm"
            bg="primary"
            width="full"
            display="flex"
            flexDirection="column"
            cursor={"pointer"}
            maxHeight={"98%"}
            position={"relative"}
          >
            {gallery.GalleryStatus === "accepted" && showStatus ? (
              <Badge
                position="absolute"
                bottom={2}
                right={2}
                zIndex={10}
                colorPalette={"green"}
              >
                Accepted
              </Badge>
            ) : gallery.GalleryStatus === "pending" && showStatus ? (
              <Badge
                position="absolute"
                bottom={2}
                right={2}
                zIndex={10}
                colorPalette={"blue"}
              >
                Pending
              </Badge>
            ) : gallery.GalleryStatus === "rejected" && showStatus ? (
              <Badge
                position="absolute"
                bottom={2}
                right={2}
                zIndex={10}
                colorPalette={"red"}
              >
                Rejected
              </Badge>
            ) : null}
            <GalleryCardSlider
              images={gallery.GalleryImages}
              delay={delay}
              vertical={vertical}
              rtl={rtl}
            />
          </Box>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <HStack gap={4}>
                <Avatar
                  colorPalette={"accent"}
                  name={gallery.Assistant?.Initial}
                  src={gallery.Assistant?.ProfilePicture}
                  size={"xs"}
                  css={{
                    outlineWidth: "2px",
                    outlineColor: "bluejack.100",
                    outlineOffset: "2px",
                    outlineStyle: "solid",
                  }}
                />
                <VStack alignItems={"start"} gap={0}>
                  <Text fontSize={"md"} fontWeight={"medium"}>
                    {gallery.Assistant?.FullName}
                  </Text>
                  <Text
                    fontSize={"xs"}
                    fontWeight={"medium"}
                    mt={-2}
                    color={"secondary"}
                  >
                    {gallery.Assistant?.Initial} {gallery.Assistant?.Generation}{" "}
                    · {formatDate(gallery.UpdatedAt!)}
                  </Text>
                </VStack>
              </HStack>
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            {" "}
            <Box mt={-2}>
              <Text fontSize={"sm"} fontWeight={"medium"} mb={2}>
                {gallery.GalleryTitle}
              </Text>
              <GalleryDetailSlider images={gallery.GalleryImages} />
            </Box>
          </DialogBody>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
