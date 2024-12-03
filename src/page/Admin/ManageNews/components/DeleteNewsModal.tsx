import { useState } from "react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { IconButton, Spinner } from "@chakra-ui/react";
import { LuTrash } from "react-icons/lu";
import { deleteNews } from "../../../../services/NewsService";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastUtils";

interface DeleteNewsProps {
  newsId: number;
  fetchNews: () => void;
}

export default function DeleteNewsModal({
  newsId,
  fetchNews,
}: DeleteNewsProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteNews(newsId);
      fetchNews();
      showSuccessToast("News deleted successfully.");
    } catch (error) {
      console.error("Failed to delete news:", error);
      showErrorToast("Failed to delete news.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogRoot
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      role="alertdialog"
    >
      <DialogTrigger asChild>
        <IconButton
          rounded="full"
          position={"absolute"}
          top={2}
          right={2}
          variant={"surface"}
          size={"sm"}
        >
          <LuTrash />
        </IconButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmation</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>Do you really want to delete this news?</p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button
            colorPalette={"red"}
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner borderWidth={"3px"} size={"sm"} animationDuration="1s" />
            ) : (
              ""
            )}
            Delete
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
