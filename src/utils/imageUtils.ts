export const convertFilesToBase64 = (files: File[]): Promise<string[]> => {
  return Promise.all(
    files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    })
  );
};
