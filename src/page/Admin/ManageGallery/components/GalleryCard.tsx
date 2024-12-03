import {
  Badge,
  Box,
  DialogHeader,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogBody,
  DialogTitle,
  DialogCloseTrigger,
} from "../../../../components/ui/dialog";
import { Gallery } from "../../../../types/Gallery";
import { Avatar } from "../../../../components/ui/avatar";
import { formatDate } from "../../../../utils/dateUtils";
import GalleryDetailSlider from "../../../../components/GalleryDetailSlider";
import GalleryCardSlider from "../../../../components/GalleryCardSlider";

interface GalleryCardProps {
  gallery: Gallery;
}

export default function GalleryCard({ gallery }: GalleryCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <DialogRoot
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      scrollBehavior={"inside"}
      lazyMount
      size={"lg"}
    >
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
          {gallery.GalleryStatus === "accepted" ? (
            <Badge
              position="absolute"
              bottom={2}
              right={2}
              zIndex={10}
              colorPalette={"green"}
            >
              Accepted
            </Badge>
          ) : gallery.GalleryStatus === "pending" ? (
            <Badge
              position="absolute"
              bottom={2}
              right={2}
              zIndex={10}
              colorPalette={"blue"}
            >
              Pending
            </Badge>
          ) : (
            <Badge
              position="absolute"
              bottom={2}
              right={2}
              zIndex={10}
              colorPalette={"red"}
            >
              Rejected
            </Badge>
          )}
          <GalleryCardSlider images={gallery.GalleryImages} />
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
                  {gallery.Assistant?.Initial} {gallery.Assistant?.Generation} ·{" "}
                  {formatDate(gallery.UpdatedAt!)}
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
  );
}
