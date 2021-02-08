import { Button, useColorModeValue, useTheme } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export const ExternalLinkButton = ({ text, leftIcon, href }) => {
  const theme = useTheme();
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Button
        size="sm"
        bg={useColorModeValue("white", "gray.700")}
        color={useColorModeValue("gray.500", "gray.300")}
        _hover={{
          background: useColorModeValue("gray.50", "gray.600"),
          color: useColorModeValue("gray.500", "gray.50"),
          boxShadow: theme.shadows["md"],
        }}
        leftIcon={leftIcon}
        rightIcon={<ExternalLinkIcon />}
      >
        {text}
      </Button>
    </a>
  );
};
