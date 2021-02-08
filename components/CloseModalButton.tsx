import Link from "next/link";
import { IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export const CloseModalButton = () => (
  <Link href="/" scroll={false} shallow>
    <IconButton
      as="a"
      pos="absolute"
      top="0"
      right="0"
      m={4}
      cursor="pointer"
      zIndex={50}
      aria-label="Close Modal"
      icon={<CloseIcon />}
    />
  </Link>
);
