import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        bluejack: {
          100: { value: "#3497ed" },
          200: { value: "#2e8bdb" },
        },
      },
    },
    semanticTokens: {
      colors: {
        primary: {
          value: { _light: "white", _dark: "#111111" },
        },
        secondary: {
          value: { _light: "#3f3f46", _dark: "#e4e4e7" },
        },
        card: {
          value: { _light: "#fafafa", _dark: "#18181b" },
        },
        "card-hover": {
          value: { _light: "#e4e4e7", _dark: "#27272a" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
