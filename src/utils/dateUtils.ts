export const formatCareerDate = (date: string) => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime()) || parsedDate.getFullYear() < 1900) {
    return "Present";
  }

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
  };

  return parsedDate.toLocaleDateString("en-US", options);
};

export function calculateDuration(
  startDate: string,
  endDate: string | null
): string {
  const start = new Date(startDate);
  const end =
    endDate && new Date(endDate).getFullYear() >= 1900
      ? new Date(endDate)
      : new Date();
  const diffInMs = end.getTime() - start.getTime();
  const diffInMonths = diffInMs / (1000 * 60 * 60 * 24 * 30.44);
  let years = Math.floor(diffInMonths / 12);
  let months = Math.floor(diffInMonths % 12) + 1;

  if (months === 12) {
    months = 0;
    years += 1;
  }

  return `${years > 0 ? `${years} yr${years > 1 ? "s" : ""} ` : ""}${
    months > 0 ? `${months} mo${months > 1 ? "s" : ""}` : ""
  }`.trim();
}
