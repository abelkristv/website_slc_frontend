import { toaster } from "../components/ui/toaster";

export const showErrorToast = (message: string) => {
  toaster.create({
    description: message,
    type: "error",
    duration: 1500,
  });
};

export const showSuccessToast = (message: string) => {
  toaster.create({
    description: message,
    type: "success",
    duration: 1500,
  });
};

export const showWaringToast = (message: string) => {
  toaster.create({
    description: message,
    type: "warning",
    duration: 5000,
  });
};
