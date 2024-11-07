export const formatCareerDate = (date: string) => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return "Present";
  }

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
  };

  return parsedDate.toLocaleDateString("en-US", options).replace(" ", ", ");
};
