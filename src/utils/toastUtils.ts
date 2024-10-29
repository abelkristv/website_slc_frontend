import { toaster } from "../components/ui/toaster";

export const showErrorToast = (message: string) => {
  toaster.create({
    title: "Error",
    description: message,
    type: "error",
    duration: 1500,
  });
};

export const showSuccessToast = (message: string) => {
  toaster.create({
    title: "Success",
    description: message,
    type: "success",
    duration: 1500,
  });
};
