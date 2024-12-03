import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogCloseTrigger,
} from "../../../components/ui/dialog";
import { News } from "../../../types/News";
import { formatDate } from "../../../utils/dateUtils";
import NewsCardSlider from "./NewsCardSlider";
import NewsDetailSlider from "./NewsDetailSlider";

interface NewsCardProps {
  news: News;
}

export default function NewsCard({ news }: NewsCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <DialogRoot
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      scrollBehavior={"inside"}
      lazyMount
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
          justifyContent={"space-between"}
        >
          <NewsCardSlider images={news.NewsImages} />
          <Box px={4} pt={3} pb={2} mt={"-2"} zIndex={10} bg={"primary"}>
            <Flex direction="column" align="start" height="full">
              <Text
                fontWeight="bold"
                fontSize="lg"
                color="secondary"
                mb={2}
                lineClamp={"1"}
                textAlign={"left"}
              >
                {news.NewsTitle || "Untitled"}
              </Text>
              <Text fontSize="sm" color="gray.500" mb={2}>
                {formatDate(news.UpdatedAt!) || "No Date"}
              </Text>
            </Flex>
          </Box>
        </Box>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {news.NewsTitle || "Untitled"}{" "}
            <Text fontSize="xs" color="gray.500" mb={2} fontWeight={"normal"}>
              {formatDate(news.UpdatedAt!) || "No Date"}
            </Text>
          </DialogTitle>
        </DialogHeader>
        <DialogBody mt={-4}>
          <Text fontSize="sm" mb={6} whiteSpace={"pre-line"}>
            {news.NewsDescription || "No description available."}
          </Text>
          <Box overflow={"hidden"} pb={5}>
            <NewsDetailSlider images={news.NewsImages} />
          </Box>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
