// 1. import `extendTheme` function
import { extendTheme, ThemeConfig } from "@chakra-ui/react";
// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
// 3. extend the theme
const theme = extendTheme({
  config,
  fonts: {
    heading: "Micro Grotesk",
    body: "Micro Grotesk",
  },
});

export { theme };
