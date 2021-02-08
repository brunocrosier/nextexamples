import { theme } from "@/lib/theme";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { memo } from "react";
import { SanitizedNextExample } from "../types/SanitizedNextExample";

export const SingleCardInList = memo(
  ({ example, score }: { example: SanitizedNextExample; score?: number }) => {
    return (
      <Link
        key={example.sanitizedName}
        href="/example/[sanitizedName]"
        as={`/example/${example.sanitizedName}`}
        scroll={false}
        shallow
      >
        <Box
          as="article"
          key={example.name}
          position="relative"
          d="flex"
          flexDir="column"
          w="100%"
          alignItems="center"
          justifyContent="center"
          width="100%"
          p={6}
          transitionDuration="0.3s"
          transitionProperty="transform, box-shadow"
          _hover={{
            boxShadow: theme.shadows["xl"],
            transform: "scale(1.05)",
          }}
          border="1px"
          borderColor={useColorModeValue("gray.300", "gray.900")}
          bg={useColorModeValue("white", "gray.800")}
          borderRadius={4}
          cursor="pointer"
          opacity={score > 0.3 ? 0.5 : 1}
        >
          <Text fontSize="large" textAlign="center">
            {example.sanitizedName}
          </Text>
        </Box>
      </Link>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.example.name === nextProps.example.name) {
      if (prevProps.score === nextProps.score) {
        return true;
      }
    } else {
      return false;
    }
  }
);
