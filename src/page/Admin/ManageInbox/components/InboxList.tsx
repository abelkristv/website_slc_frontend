import { VStack, Box, HStack, Text, Badge } from "@chakra-ui/react";
import { ContactUs } from "../../../../types/ContactUs";
import { Avatar } from "../../../../components/ui/avatar";

interface InboxListProps {
  inboxes: ContactUs[];
  onSelect: (inbox: ContactUs) => void;
}

export function InboxList({ inboxes, onSelect }: InboxListProps) {
  return (
    <VStack
      width={{ base: "100%", lg: "33%" }}
      gap={0}
      height={{ base: "100%", lg: "72vh" }}
      overflowY={"scroll"}
      _scrollbarThumb={{
        bg: "gray.500",
        borderRadius: "full",
      }}
      _scrollbar={{ width: "5px" }}
      borderBottomWidth={"1px"}
      borderTopWidth={"1px"}
    >
      {inboxes.map((inbox, index) => (
        <Box
          key={index}
          borderBottomWidth={"1px"}
          bg="primary"
          _hover={{ bg: "card" }}
          cursor="pointer"
          width={"full"}
          py={4}
          px={4}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={8}
          textAlign={"left"}
          onClick={() => onSelect(inbox)}
          minHeight={20}
        >
          <HStack gap={4} maxWidth={"60%"}>
            <Avatar name={inbox.Name} src="" />
            <VStack alignItems={"start"} gap={0} width={"full"}>
              <Text fontWeight={"bold"} width={"full"} truncate>
                {inbox.Name}
              </Text>
              <Text width={"full"} fontSize={"sm"} truncate>
                {inbox.Message}
              </Text>
            </VStack>
          </HStack>

          <VStack alignItems={"end"}>
            <Text fontSize={"xs"} color="gray.500" right={4} top={4}>
              {new Date(inbox.CreatedAt!).toLocaleDateString()}
            </Text>
            <Badge
              variant={"surface"}
              colorPalette={inbox.IsRead ? "green" : "red"}
            >
              {inbox.IsRead ? "Read" : "Unread"}
            </Badge>
          </VStack>
        </Box>
      ))}
    </VStack>
  );
}
