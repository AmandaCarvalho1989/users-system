import type { AppProps } from "next/app";
import Head from 'next/head'
import { ChakraProvider, VStack, Stack, useMediaQuery } from "@chakra-ui/react";
import { AuthProvider } from "../hooks/auth";
import { Header } from "../components/Header";
import { SideNav } from "../components/SideNav";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import theme from "../styles/theme";

import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { route } = useRouter();
  const unauthenticatedRoutes = ["/signin"];
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  return (
    <ChakraProvider theme={theme}>
      <ToastContainer position="top-right" autoClose={4000} />
      <AuthProvider>
        <>
          <Head>
            <title>UsersSystem</title>
          </Head>
          {!unauthenticatedRoutes.includes(route) ? (
            <Stack
              direction={["column", "column", "row", "row"]}
              w="100vw"
              h="100vh"
              maxW="100vw"
              maxH="100vh"
              bgColor="gray.50"
              spacing={0}
              overflow={["auto", "auto", "hidden", "hidden"]}
            >
              <SideNav />
              <VStack
                as="main"
                h="full"
                w={["full"]}
                maxW={isLargerThan1280 ? "85vw" : "100vw"}
                bgColor="gray.50"
                position="relative"
              >
                <Header />
                <Component {...pageProps} />
              </VStack>
            </Stack>
          ) : (
            <Component {...pageProps} />
          )}
        </>
      </AuthProvider>
    </ChakraProvider>
  );
}
export default MyApp;
