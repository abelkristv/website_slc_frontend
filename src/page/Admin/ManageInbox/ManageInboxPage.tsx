import { VStack, Text, Box, HStack, Badge, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ContactUs } from "../../../types/ContactUs";
import { getContactUs } from "../../../services/ContactUsService";
import { Avatar } from "../../../components/ui/avatar";
import { EmptyState } from "../../../components/ui/empty-state";
import { MdOutlineEmail } from "react-icons/md";
import { SegmentedControl } from "../../../components/ui/segmented-control";

export default function ManageInboxPage() {
  const [inboxes, setInboxes] = useState<ContactUs[]>([]);
  const [selectedInbox, setSelectedInbox] = useState<ContactUs | null>(null);
  const [value, setValue] = useState("All");

  useEffect(() => {
    const fetchInboxes = async () => {
      const data = await getContactUs();
      setInboxes(data);
    };
    fetchInboxes();
  }, []);

  return (
    <VStack gap={4} bg="primary" p={6} borderRadius="lg" boxShadow="lg">
      <Text fontSize="4xl" fontWeight="bold" color="bluejack.100">
        Manage Inbox
      </Text>
      <Flex width={"full"} justifyContent={"start"}>
        {" "}
        <SegmentedControl
          value={value}
          onValueChange={(e) => setValue(e.value)}
          items={["All", "Read", "Unread"]}
        />
      </Flex>

      <HStack width={"full"} gap={1} alignItems={"start"}>
        <VStack width={"33%"} gap={1} maxHeight={"72vh"} overflowY={"scroll"}>
          {inboxes.map((inbox, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="sm"
              overflow="hidden"
              boxShadow="sm"
              bg="primary"
              _hover={{ bg: "card" }}
              cursor="pointer"
              width={"full"}
              py={4}
              px={4}
              display="flex"
              alignItems="center"
              justifyContent="start"
              transition="transform 0.2s"
              gap={4}
              textAlign={"left"}
              onClick={() => setSelectedInbox(inbox)}
              position={"relative"}
              minHeight={20}
            >
              <Avatar name={inbox.Name} src="" />
              <VStack alignItems={"start"} gap={0}>
                <Text fontWeight={"bold"} maxWidth={"48"} truncate>
                  {inbox.Name}
                </Text>
                <Text fontSize={"sm"} maxWidth={"56"} truncate>
                  {inbox.Message}
                </Text>
                <Text
                  fontSize={"xs"}
                  color="gray.500"
                  position={"absolute"}
                  right={4}
                  top={4}
                >
                  {new Date(inbox.CreatedAt!).toLocaleDateString()}
                </Text>
                <Badge
                  variant={"surface"}
                  colorPalette={inbox.IsRead ? "green" : "red"}
                  position={"absolute"}
                  bottom={4}
                  right={4}
                >
                  {inbox.IsRead ? "Read" : "Unread"}
                </Badge>
              </VStack>
            </Box>
          ))}{" "}
        </VStack>
        <Box
          borderWidth="1px"
          borderRadius="sm"
          boxShadow="sm"
          bg="primary"
          width="66%"
          minHeight="72vh"
          py={4}
          px={4}
          display="flex"
          flexDirection="column"
          alignItems="start"
          justifyContent="start"
          textAlign="left"
          overflow="auto"
          wordBreak="break-word"
          position={"relative"}
        >
          {selectedInbox ? (
            <>
              <HStack gap={4} alignItems={"start"}>
                <Avatar name={selectedInbox.Name} src="" />
                <VStack alignItems={"start"} gap={0.5} pr={12}>
                  {" "}
                  <Text fontWeight="bold">{selectedInbox.Name}</Text>
                  <Text color="gray.600" fontSize={"sm"}>
                    Email: {selectedInbox.Email}
                  </Text>
                  <Text color="gray.600" fontSize={"sm"}>
                    WhatsApp: {selectedInbox.Phone}
                  </Text>
                  <Text color="gray.500" fontSize={"sm"}>
                    Received:{" "}
                    {new Date(selectedInbox.CreatedAt!).toLocaleString()}
                  </Text>
                  <Text mt={4} fontSize={"sm"} whiteSpace="pre-line">
                    {selectedInbox.Message}
                  </Text>
                </VStack>
              </HStack>
            </>
          ) : (
            <EmptyState
              icon={<MdOutlineEmail />}
              title="No message selected"
              description="Select a message to view"
              bg={"primary"}
              borderRadius={"md"}
              py={8}
              mt={-4}
            ></EmptyState>
          )}
        </Box>
      </HStack>
    </VStack>
  );
}
