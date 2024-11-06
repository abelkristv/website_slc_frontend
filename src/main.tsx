import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./theme.ts";
import { ColorModeProvider } from "./components/ui/color-mode.tsx";
import UserProvider from "./contexts/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ChakraProvider value={system}>
    <ColorModeProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ColorModeProvider>
  </ChakraProvider>
);
