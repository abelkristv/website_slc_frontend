import { VStack, Text, Flex, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ContactUs } from "../../../types/ContactUs";
import { getContactUs } from "../../../services/ContactUsService";
import { SegmentedControl } from "../../../components/ui/segmented-control";
import { InboxList } from "./components/InboxList";
import { InboxDetails } from "./components/InboxDetails";
import { InboxDrawer } from "./components/InboxDrawer";

export default function ManageInboxPage() {
  const [inboxes, setInboxes] = useState<ContactUs[]>([]);
  const [selectedInbox, setSelectedInbox] = useState<ContactUs | null>(null);
  const [value, setValue] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mobile = useBreakpointValue({ base: true, lg: false });

  const fetchInboxes = async () => {
    const data = await getContactUs();
    setInboxes(data);
    setSelectedInbox(null);
    setDrawerOpen(false);
  };

  useEffect(() => {
    fetchInboxes();
  }, []);

  const filteredInboxes = inboxes.filter((inbox) => {
    if (value === "All") return true;
    if (value === "Read") return inbox.IsRead;
    if (value === "Unread") return !inbox.IsRead;
    return true;
  });

  const handleSelectInbox = (inbox: ContactUs) => {
    setSelectedInbox(inbox);
    if (mobile) {
      setDrawerOpen(true);
    }
  };

  return (
    <VStack gap={4} bg="primary" p={6} borderRadius="lg" boxShadow="lg">
      <Text fontSize="4xl" fontWeight="bold" color="bluejack.100">
        Manage Inbox
      </Text>
      <Flex width={"full"} justifyContent={"start"}>
        <SegmentedControl
          value={value}
          onValueChange={(e) => setValue(e.value)}
          items={["All", "Read", "Unread"]}
        />
      </Flex>
      <Flex
        width={"full"}
        gap={1}
        alignItems={"start"}
        flexDirection={{ base: "column", lg: "row" }}
      >
        <InboxList inboxes={filteredInboxes} onSelect={handleSelectInbox} />
        <InboxDetails
          selectedInbox={selectedInbox}
          fetchInboxes={fetchInboxes}
        />
        <InboxDrawer
          selectedInbox={selectedInbox}
          fetchInboxes={fetchInboxes}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
      </Flex>
    </VStack>
  );
}
