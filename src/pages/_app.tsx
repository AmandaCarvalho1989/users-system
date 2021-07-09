import { useEffect } from "react";
import type { AppProps } from "next/app";
import { ChakraProvider, VStack, HStack } from "@chakra-ui/react";
import { AuthProvider, useAuth } from "../hooks/auth";
import { Header } from "../components/Header";
import { SideNav } from "../components/SideNav";
import theme from "../styles/theme";
import { useRouter } from "next/dist/client/router";

function MyApp({ Component, pageProps }: AppProps) {

  const { route } = useRouter();
  const noPrivateRoutes = ["/signin"];

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        {!noPrivateRoutes.includes(route) ? (
          <HStack w="100vw" h="100vh" bgColor="gray.50" spacing={0}>
            <SideNav />
            <VStack
              as="main"
              h="full"
              flex="1"
              bgColor="gray.50"
              position="relative"
            >
              <Header />
              <Component {...pageProps} />
            </VStack>
          </HStack>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthProvider>
    </ChakraProvider>
  );
}
export default MyApp;
