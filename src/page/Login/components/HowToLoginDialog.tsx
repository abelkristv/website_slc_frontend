import { Button, IconButton } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { MdQuestionMark } from "react-icons/md";

export default function HowToLoginDialog() {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <IconButton
          aria-label="Default Password Info"
          variant="outline"
          rounded="full"
          px={4}
          borderColor="gray.300"
        >
          <MdQuestionMark /> How to Login
        </IconButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How to Login</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            This login is for assistants and alumni of Software Laboratory
            Center:
          </p>
          <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
            <li>
              <strong>Username Format:</strong> Use your <em>initial</em> and{" "}
              <em>generation</em> (e.g., <strong>DT23-2</strong>).
            </li>
            <li>
              <strong>Default Password:</strong> Your birthdate in the format{" "}
              <strong>slc-DDMMYYYY</strong>.
            </li>
          </ul>
          <p style={{ marginTop: "10px" }}>
            <em>Example:</em> If your birthdate is June 23, 2003, your default
            password would be <strong>slc-23062003</strong>.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Close</Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
