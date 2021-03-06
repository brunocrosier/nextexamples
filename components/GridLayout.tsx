import { useContext, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { Card } from "./Card";
import Head from "next/head";
import { SingleCardInList } from "./SingleCardInList";
import { SanitizedNextExample } from "../types/SanitizedNextExample";
import { useRouter } from "next/router";
import { NextAppContext } from "../pages/_app";
import { useInView } from "react-intersection-observer";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Kbd,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { ExternalLinkIcon, SearchIcon } from "@chakra-ui/icons";
import { theme } from "@/lib/theme";
import { DarkModeToggle } from "./DarkModeToggle";
import { FiGithub, FiRefreshCcw } from "react-icons/fi";
import { ExternalLinkButton } from "./ExternalLinkButton";
import { GoLogoGithub, GoMarkGithub } from "react-icons/go";

Modal.setAppElement("#__next");

export const GridLayout = ({
  data,
  sanitizedName,
}: {
  data: SanitizedNextExample[];
  sanitizedName: string;
}) => {
  const {
    searchInputText,
    setSearchInputText,
    searchResults,
    setSearchResults,
  } = useContext(NextAppContext);

  const router = useRouter();

  const { ref: topSectionRef, inView: isTopSectionInView, entry } = useInView({
    threshold: 0,
  });

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.key === "/") {
        inputRef.current.focus();
      }
    });
  }, []);

  // "lock" scrolling when the modal is open
  useEffect(() => {
    document.body.style.overflow = sanitizedName ? "hidden" : "";
  }, [sanitizedName]);

  return (
    <>
      <Head>
        <title>Next.js Examples {sanitizedName && `| ${sanitizedName}`}</title>
        <meta
          name="Description"
          content="Explore all the official Next.js examples, for free"
        />
      </Head>
      {/* this 'modal' only shows up when we are on /example/[sanitizedName] */}
      {sanitizedName && (
        <Flex
          alignItems="flex-start"
          justifyContent="center"
          h="100vh"
          w="100vw"
          pos="fixed"
          zIndex={100}
          bg="blackAlpha.500"
          sx={{
            backdropFilter: "blur(3px)",
          }}
          onClick={(e) => {
            // prevent onClick from being fired when clicking on the child components!
            if (e.target === e.currentTarget) {
              router.push("/", undefined, { shallow: true, scroll: false });
            }
          }}
        >
          <Box
            my={6}
            w="60rem"
            maxW="calc(100vw - 3rem)"
            overflow="hidden"
            rounded={["xl", "2xl"]}
            shadow="2xl"
          >
            <Card
              example={data.find(
                (repo) => repo.sanitizedName === sanitizedName
              )}
            />
          </Box>
        </Flex>
      )}
      {/* main page */}
      <Stack
        alignItems="center"
        bgGradient={`linear(to-tr, ${useColorModeValue(
          "gray.100",
          "blackAlpha.400"
        )}, ${useColorModeValue("gray.50", "blackAlpha.300")})`}
        minH="100vh"
      >
        <DarkModeToggle />
        <Stack
          as="main"
          alignItems="center"
          spacing={[6, 10]}
          px={4}
          py={20}
          ref={topSectionRef}
        >
          <Heading
            as="h1"
            fontSize="4xl"
            fontWeight="extrabold"
            textAlign="center"
            color={useColorModeValue("gray.600", "gray.50")}
          >
            Next.js{" "}
            <Heading
              as="span"
              fontSize="4xl"
              fontWeight="extrabold"
              backgroundClip="text"
              color="transparent"
              bgGradient={`linear(to-tr, ${useColorModeValue(
                "blue.400",
                "blue.300"
              )}, ${useColorModeValue("pink.500", "green.400")})`}
            >
              examples
            </Heading>
          </Heading>
          <Text
            fontSize={["lg", "xl"]}
            fontWeight="semibold"
            textAlign="center"
            color={useColorModeValue("gray.600", "gray.50")}
          >
            Explore all the official Next.js examples
          </Text>
          <ExternalLinkButton
            href="https://github.com/brunocrosier/nextexamples"
            text="Contribute"
            leftIcon={<GoMarkGithub />}
          />
        </Stack>
        <FormControl
          pos="sticky"
          d="flex"
          justifyContent="center"
          mx="auto"
          top="0"
          zIndex="50"
          w="100%"
          px={[4, 6, 10, 16]}
          py={4}
          bg={useColorModeValue("gray.100", "gray.800")}
          transition="0.3s box-shadow"
          sx={{
            boxShadow: isTopSectionInView ? 0 : theme.shadows["xl"],
          }}
        >
          <VisuallyHidden>
            <label htmlFor="search-input">
              Search all {data.length} Next.js example
            </label>
          </VisuallyHidden>
          <InputGroup
            border="none"
            size="lg"
            shadow="md"
            maxW={["640px", "768px", "1024px", "1280px", "1536px"]}
          >
            {searchInputText ? (
              <InputLeftElement
                bg="transparent"
                cursor="pointer"
                border="none"
                onClick={() => setSearchInputText("")}
                children={<FiRefreshCcw />}
              />
            ) : (
              <InputLeftElement
                bg="transparent"
                pointerEvents="none"
                border="none"
                children={<SearchIcon />}
              />
            )}
            <Input
              type="text"
              ref={inputRef}
              id="search-input"
              value={searchInputText}
              autoComplete="off"
              variant="outline"
              onFocus={(e) =>
                e.currentTarget.scrollIntoView({ behavior: "smooth" })
              }
              onClick={(e) =>
                e.currentTarget.scrollIntoView({ behavior: "smooth" })
              }
              onChange={async (e) => {
                const { value } = e.target;

                // Dynamically load fuse.js
                const Fuse = (await import("fuse.js")).default;
                const fuse = new Fuse(data, {
                  keys: ["sanitizedName"],
                  includeScore: true,
                  threshold: 0.45,
                });

                setSearchInputText(value);
                setSearchResults(fuse.search(value));
              }}
              placeholder={`Search all ${data.length} Next.js examples`}
              bg={useColorModeValue("white", "gray.700")}
              border="none"
              color="gray.400"
              _placeholder={{
                color: "gray.400",
              }}
              _focus={{
                border: "2px solid rgb(99 179 237)",
                boxShadow:
                  theme.shadows["2xl"] + ", rgb(99 179 237) 0px 0px 0px 1px",
              }}
            />
            <InputRightElement
              d="flex"
              w="max-content"
              alignItems="center"
              border="none"
              children={
                <Kbd size="lg" mx={2}>
                  /
                </Kbd>
              }
            />
          </InputGroup>
        </FormControl>
        <SimpleGrid
          columns={[1, 2, 3, 4]}
          p={[4, 6, 8]}
          spacing={[4, 6]}
          w="100%"
          maxW={["640px", "768px", "1024px", "1280px", "1536px"]}
        >
          {searchResults && searchInputText
            ? searchResults.map((example: any) => (
                <SingleCardInList
                  key={example.item.sanitizedName}
                  example={example.item}
                  score={example.score}
                />
              ))
            : data.map((example: any) => (
                <SingleCardInList
                  key={example.sanitizedName}
                  example={example}
                />
              ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};
