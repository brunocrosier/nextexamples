import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import dark from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";
import { SanitizedNextExample } from "../types/SanitizedNextExample";
import {
  Box,
  Link as ChakraLink,
  Heading,
  HStack,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useColorModeValue,
  useTheme,
  SimpleGrid,
  Grid,
  Flex,
} from "@chakra-ui/react";
import { GoMarkGithub } from "react-icons/go";
import { FiCodesandbox } from "react-icons/fi";
import { CloseModalButton } from "./CloseModalButton";
import { ExternalLinkButton } from "./ExternalLinkButton";

const renderers = {
  code: ({ language, value }) => {
    return (
      <SyntaxHighlighter style={dark} language={language} children={value} />
    );
  },
  inlineCode: ({ value }) => {
    return (
      <Text
        as="span"
        px={[4, 6]}
        rounded="md"
        lineHeight={6}
        whiteSpace="nowrap"
        bg={useColorModeValue("gray.200", "gray.700")}
        border="1px solid"
        borderColor={useColorModeValue("gray.300", "gray.500")}
        style={{
          fontFamily: `Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace`,
        }}
        children={value}
      />
    );
  },
  heading: ({ level, children }) => {
    switch (level) {
      case 1:
        return <Heading as="h2" size="lg" py={2} children={children} />;
      case 2:
        return <Heading as="h2" size="md" py={2} children={children} />;
      case 3:
        return <Heading as="h3" py={2} children={children} />;
      default:
        return children;
    }
  },
  paragraph: (paragraph) => <Text py={2} children={paragraph.children} />,
  list: ({ children }) => (
    <UnorderedList py={3} listStylePosition="inside" children={children} />
  ),
  listItem: ({ children }) => <ListItem children={children} />,
  link: ({ href, children }) => {
    return (
      <ChakraLink
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        fontWeight="bold"
        color={useColorModeValue("blue.500", "blue.300")}
        children={children}
      />
    );
  },
};

const Dependencies = ({
  depsArray,
  typeOfDependcies: typeOfDependencies,
}: {
  depsArray: string[];
  typeOfDependcies: "Dependencies" | "Dev Dependencies";
}) => {
  const theme = useTheme();
  return (
    depsArray?.length > 0 && (
      <Flex
        flexWrap="wrap"
        sx={{
          gap: "0.4rem",
        }}
      >
        <Text flexShrink={0} mr={2} fontSize="sm" fontWeight="600">
          {typeOfDependencies}:
        </Text>
        <UnorderedList
          listStyleType="none"
          d="contents"
          className="flex-with-gap"
          sx={{
            "--column-gap": "0.15rem",
            "--row-gap": "0.15rem",
          }}
        >
          {depsArray.map((dependencyName) => (
            <ListItem
              key={dependencyName}
              px={2}
              py={0}
              fontSize="sm"
              flexShrink={0}
              rounded="md"
              fontWeight="semibold"
              bgGradient={
                typeOfDependencies === "Dependencies"
                  ? "linear(to-tr, blue.400, blue.300)"
                  : "linear(to-tr, pink.400, pink.300)"
              }
              color="gray.50"
              transition="0.3s box-shadow"
              _hover={{
                shadow: theme.shadows["md"],
              }}
            >
              <a
                href={`https://npmjs.com/package/${dependencyName}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dependencyName}
              </a>
            </ListItem>
          ))}
        </UnorderedList>
      </Flex>
    )
  );
};

export const Card = ({ example }: { example: SanitizedNextExample }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      pos="relative"
      maxH="100%"
      overflow="hidden"
      rounded="lg"
      spacing={0}
    >
      <Grid
        gap={[2, 3]}
        alignItems="flex-start"
        px={6}
        py={[4, 6]}
        borderBottom="2px solid"
        borderColor={useColorModeValue("gray.300", "gray.900")}
        bg={useColorModeValue("gray.100", "gray.900")}
      >
        <CloseModalButton />
        <Heading
          as="h3"
          size="xl"
          mr={8}
          color={useColorModeValue("gray.600", "gray.100")}
          fontWeight="bold"
        >
          {example.sanitizedName}
        </Heading>
        <HStack spacing={[2, 4]}>
          <ExternalLinkButton
            href={example.html_url}
            text="GitHub"
            leftIcon={<GoMarkGithub />}
          />

          <ExternalLinkButton
            href={`https://codesandbox.io/s/github/vercel/next.js/blob/canary/examples/${example.name}/`}
            text="CodeSandbox"
            leftIcon={<FiCodesandbox />}
          />
        </HStack>
        {[
          example?.dependencies?.length > 0,
          example?.devDependencies?.length > 0,
        ].includes(true) && (
          <SimpleGrid
            gap={2}
            w="100%"
            p={[2, 4]}
            overflowY="auto"
            shadow="md"
            maxH={24}
            bg={useColorModeValue("white", "blackAlpha.500")}
            rounded="lg"
          >
            <Dependencies
              depsArray={example.dependencies}
              typeOfDependcies="Dependencies"
            />
            <Dependencies
              depsArray={example.devDependencies}
              typeOfDependcies="Dev Dependencies"
            />
          </SimpleGrid>
        )}
      </Grid>
      <Box p={6} overflow="auto" w="100%">
        <ReactMarkdown renderers={renderers} allowDangerousHtml>
          {example?.content}
        </ReactMarkdown>
      </Box>
    </Stack>
  );
};
