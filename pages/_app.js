import { theme } from "@/lib/theme";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

import { createContext, useEffect, useState } from "react";

export const NextAppContext = createContext();

function MyApp({ Component, pageProps }) {
  const [searchInputText, setSearchInputText] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  return (
    <>
      <ChakraProvider theme={theme}>
        <NextAppContext.Provider
          value={{
            searchInputText,
            setSearchInputText,
            searchResults,
            setSearchResults,
          }}
        >
          <Head>
            <link rel="icon" href="/favicon.ico" />
            <link
              href="/MicroGrotesk.ttf"
              as="font"
              crossOrigin=""
              rel="preload"
            />
            <meta property="og:type" content="website" />
            <meta
              property="og:url"
              content="https://nextexamples.vercel.app/"
            />
            <meta property="og:title" content="Next.js Examples" />
            <meta
              property="og:description"
              content="Explore all the official Next.js examples, for free"
            />
            <meta property="og:image" content="/opengraph.jpg" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta
              property="twitter:url"
              content="https://nextexamples.vercel.app/"
            />
            <meta property="twitter:title" content="Next.js Examples" />
            <meta
              property="twitter:description"
              content="Explore all the official Next.js examples, for free"
            />
            <meta property="twitter:image" content="" />
          </Head>
          <Component {...pageProps} />
        </NextAppContext.Provider>
      </ChakraProvider>
      <style jsx global>{`
        @font-face {
          font-family: "Micro Grotesk";
          font-style: normal;
          font-weight: 100 900;
          font-display: block;
          src: url("/MicroGrotesk.ttf");
        }

        body,
        #__next {
          min-height: 100vh;
          min-height: -webkit-fill-available;
        }
        html {
          height: -webkit-fill-available;
        }

        html {
          --scrollbarBG: #f4f6f7;
          --thumbBG: #abc0ca;
        }

        body.chakra-ui-dark {
          --scrollbarBG: #151a24;
          --thumbBG: #282a36;
        }

        *::-webkit-scrollbar {
          width: 11px;
          height: 11px;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: var(--thumbBG) var(--scrollbarBG);
        }
        *::-webkit-scrollbar-track {
          background: var(--scrollbarBG);
        }
        *::-webkit-scrollbar-thumb {
          background-color: var(--thumbBG);
          border-radius: 6px;
          border: 3px solid var(--scrollbarBG);
        }

        .flex-with-gap {
          display: flex;
          --gap: 0px;
          --column-gap: var(--gap);
          --row-gap: var(--gap);
          margin: calc(var(--row-gap) / -2) calc(var(--column-gap) / -2);
        }

        .flex-with-gap > * {
          margin: calc(var(--row-gap) / 2) calc(var(--column-gap) / 2);
        }
      `}</style>
    </>
  );
}

export default MyApp;
