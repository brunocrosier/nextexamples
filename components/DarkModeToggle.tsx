import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";

export const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      pos="fixed"
      top={4}
      right={4}
      aria-label={`Switch to ${colorMode === "light" ? "Dark" : "Light"} Mode`}
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      onClick={() => toggleColorMode()}
      bg={useColorModeValue("gray.100", "gray.700")}
    />
  );
};
