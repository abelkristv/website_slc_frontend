import { useState } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { useAwards } from "../hooks/useAwards";
import AwardForm from "./AwardForm";

interface AddAwardsModalProps {
  fetchData: () => void;
}

export default function AddAwardsModal({ fetchData }: AddAwardsModalProps) {
  const [open, setOpen] = useState(false);
  const { awards, assistants, periods, isLoading } = useAwards();

  const handleClose = () => {
    setOpen(false);
    fetchData();
  };

  return (
    <DialogRoot
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      scrollBehavior={"inside"}
    >
      <DialogTrigger asChild>
        <Button
          position={"absolute"}
          right={0}
          top={0}
          transform={"translateY(20%)"}
          bg={"white"}
          _hover={{ bg: "gray.100" }}
          color={"black"}
          size={{ base: "sm", md: "md" }}
        >
          Add Awards
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Award</DialogTitle>
        </DialogHeader>
        <DialogBody display={"flex"} flexDir={"column"} gap={4} as={"form"}>
          <AwardForm
            awards={awards || []}
            assistants={assistants || []}
            periods={periods || []}
            isLoading={isLoading}
            handleClose={handleClose}
          />
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
