export const showErrorToast = (toast: any, message: string) => {
  toast.closeAll();
  toast({
    title: "Error",
    description: message,
    status: "error",
    duration: 5000,
    isClosable: true,
  });
};

export const showSuccessToast = (toast: any, message: string) => {
  toast.closeAll();
  toast({
    title: "Success",
    description: message,
    status: "success",
    duration: 5000,
    isClosable: true,
  });
};
