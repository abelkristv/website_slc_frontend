"use client";

import { For, SegmentGroup } from "@chakra-ui/react";
import { forwardRef, useMemo } from "react";

interface Item {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps extends SegmentGroup.RootProps {
  items: Array<string | Item>;
}

function normalize(items: Array<string | Item>): Item[] {
  return items.map((item) => {
    if (typeof item === "string") return { value: item, label: item };
    return item;
  });
}

export const SegmentedControl = forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(function SegmentedControl(props, ref) {
  const { items, ...rest } = props;
  const data = useMemo(() => normalize(items), [items]);
  const { value } = props;

  return (
    <SegmentGroup.Root ref={ref} {...rest}>
      <SegmentGroup.Indicator bgColor={"bluejack.100"} />
      <For each={data}>
        {(item) => (
          <SegmentGroup.Item
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            minW={20}
            justifyContent={"center"}
            cursor={"pointer"}
          >
            <SegmentGroup.ItemText
              color={item.value == value ? "white" : undefined}
            >
              {item.label}
            </SegmentGroup.ItemText>
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
        )}
      </For>
    </SegmentGroup.Root>
  );
});
