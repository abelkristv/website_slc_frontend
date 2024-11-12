import { Timeline as ChakraTimeline } from "@chakra-ui/react";

export const TimelineRoot = ChakraTimeline.Root;
export const TimelineContent = ChakraTimeline.Content;
export const TimelineItem = ChakraTimeline.Item;
export const TimelineIndicator = ChakraTimeline.Indicator;
export const TimelineTitle = ChakraTimeline.Title;
export const TimelineDescription = ChakraTimeline.Description;

export const TimelineConnector = (props: ChakraTimeline.IndicatorProps) => {
  return (
    <ChakraTimeline.Connector>
      <ChakraTimeline.Separator
        mt={2}
        borderWidth={1.5}
        transform={"translateX(-120%)"}
      />
      <ChakraTimeline.Indicator {...props} />
    </ChakraTimeline.Connector>
  );
};
