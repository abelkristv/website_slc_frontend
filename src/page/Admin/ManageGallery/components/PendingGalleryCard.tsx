import {
  Badge,
  Box,
  DialogHeader,
  HStack,
  Spinner,
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
  DialogFooter,
} from "../../../../components/ui/dialog";
import { Gallery } from "../../../../types/Gallery";
import { Avatar } from "../../../../components/ui/avatar";
import { formatDate } from "../../../../utils/dateUtils";
import GalleryDetailSlider from "../../../../components/GalleryDetailSlider";
import { Button } from "../../../../components/ui/button";
import {
  acceptGallery,
  rejectGallery,
} from "../../../../services/GalleryService";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastUtils";
import GalleryCardSlider from "../../../../components/GalleryCardSlider";

interface PendingGalleryCardProps {
  gallery: Gallery;
  fetchData: () => void;
}

export default function PendingGalleryCard({
  gallery,
  fetchData,
}: PendingGalleryCardProps) {
  const [open, setOpen] = useState(false);
  const [isAcceptLoading, setIsAcceptLoading] = useState(false);
  const [isRejectLoading, setIsRejectLoading] = useState(false);

  const handleAccept = async () => {
    setIsAcceptLoading(true);
    try {
      await acceptGallery(gallery.ID!);
      showSuccessToast("Gallery accepted successfully");
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to accept gallery");
    }
    setIsAcceptLoading(false);
    fetchData();
    setOpen(false);
  };

  const handleReject = async () => {
    setIsRejectLoading(true);
    try {
      await rejectGallery(gallery.ID!);
      showSuccessToast("Gallery rejected successfully");
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to reject gallery");
    }
    setIsRejectLoading(false);
    fetchData();
    setOpen(false);
  };

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
        <DialogFooter>
          <Button
            onClick={handleAccept}
            bg="bluejack.100"
            color="white"
            _hover={{ bg: "bluejack.200" }}
            mt={6}
            disabled={isAcceptLoading || isRejectLoading}
          >
            {isAcceptLoading ? (
              <Spinner borderWidth={"3px"} size={"sm"} animationDuration="1s" />
            ) : (
              ""
            )}
            Accept
          </Button>
          <Button
            onClick={handleReject}
            colorPalette="red"
            variant="surface"
            mt={6}
            disabled={isAcceptLoading || isRejectLoading}
          >
            {isRejectLoading ? (
              <Spinner borderWidth={"3px"} size={"sm"} animationDuration="1s" />
            ) : (
              ""
            )}
            Reject
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
