import { HStack, VStack, Text, Button } from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { ContactUs } from "../../../../types/ContactUs";
import { EmptyState } from "../../../../components/ui/empty-state";
import { Avatar } from "../../../../components/ui/avatar";
import {
  deleteMessage,
  updateIsRead,
} from "../../../../services/ContactUsService";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastUtils";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from "../../../../components/ui/drawer";

interface InboxDrawerProps {
  selectedInbox: ContactUs | null;
  fetchInboxes: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
}

export function InboxDrawer({
  selectedInbox,
  fetchInboxes,
  drawerOpen,
  setDrawerOpen,
}: InboxDrawerProps) {
  const onMarkAsRead = async (id: number) => {
    try {
      await updateIsRead(id);
      showSuccessToast("Marked as read");
      fetchInboxes();
    } catch (error) {
      console.error("Failed to mark as read:", error);
      showErrorToast("Failed to mark as read");
    }
  };

  const onDelete = async (id: number) => {
    try {
      await deleteMessage(id);
      showSuccessToast("Message deleted");
      fetchInboxes();
    } catch (error) {
      console.error("Failed to delete contact:", error);
      showErrorToast("Failed to delete contact");
    }
  };

  return (
    <DrawerRoot
      open={drawerOpen}
      onOpenChange={(e) => setDrawerOpen(e.open)}
      placement="bottom"
    >
      <DrawerBackdrop />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Details</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          {selectedInbox ? (
            <>
              <HStack gap={4} alignItems={"start"} width={"full"}>
                <Avatar name={selectedInbox.Name} src="" />
                <VStack alignItems={"start"} gap={0.5}>
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
                  <Text mt={4} fontSize={"sm"} whiteSpace="pre-line" pr={12}>
                    {selectedInbox.Message}
                  </Text>
                  <HStack mt={6}>
                    {!selectedInbox.IsRead && (
                      <Button
                        bg="bluejack.100"
                        _hover={{ bg: "bluejack.200" }}
                        color={"white"}
                        size={"xs"}
                        px={4}
                        onClick={() => onMarkAsRead(selectedInbox.ID!)}
                      >
                        Mark As Read
                      </Button>
                    )}
                    <Button
                      colorPalette="red"
                      variant="surface"
                      size={"xs"}
                      px={4}
                      onClick={() => onDelete(selectedInbox.ID!)}
                    >
                      Delete Message
                    </Button>
                  </HStack>
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
            />
          )}
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
}
