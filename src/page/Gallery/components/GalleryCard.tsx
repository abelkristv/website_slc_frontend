import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import Slider from "react-slick";
import { Gallery } from "../../../types/Gallery";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { useState } from "react";
import { formatDate } from "../../../utils/dateUtils";
import { Avatar } from "../../../components/ui/avatar";
import {
  GalleryNextArrow,
  GalleryPrevArrow,
} from "../../../components/GalleryCarouselArrow";

interface GalleryCardProps {
  gallery: Gallery;
}

export default function GalleryCard({ gallery }: GalleryCardProps) {
  const [open, setOpen] = useState(false);

  const sliderSettings = {
    infinite: gallery.GalleryImages.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: gallery.GalleryImages.length > 1,
    autoplaySpeed: 3000,
  };

  const sliderDetailSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: gallery.GalleryImages.length > 1,
    prevArrow: <GalleryPrevArrow />,
    nextArrow: <GalleryNextArrow />,
    adaptiveHeight: true,
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
        >
          <Box
            width="100%"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.02)" }}
          >
            <Slider {...sliderSettings}>
              {gallery.GalleryImages.map((image, imgIndex) => (
                <Box key={imgIndex}>
                  <img
                    src={image}
                    alt={`Slide ${imgIndex + 1}`}
                    style={{
                      width: "100%",
                      aspectRatio: "1/1",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Slider>
          </Box>
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
                  {gallery.Assistant?.Initial}
                  {gallery.Assistant?.Generation} ·{" "}
                  {formatDate(gallery.UpdatedAt!)}
                </Text>
              </VStack>
            </HStack>
          </DialogTitle>
        </DialogHeader>
        <DialogBody mt={-4}>
          <Text fontSize={"sm"} fontWeight={"medium"} mb={2}>
            {gallery.GalleryTitle}
          </Text>
          <Box overflow={"hidden"} pb={5}>
            <Slider {...sliderDetailSettings}>
              {gallery.GalleryImages.map((image, imgIndex) => (
                <Box key={imgIndex}>
                  <img
                    src={image}
                    alt={`Slide ${imgIndex + 1}`}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Box>
              ))}
            </Slider>
          </Box>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
