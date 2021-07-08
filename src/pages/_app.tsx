import type { AppProps } from "next/app";
import { ChakraProvider, VStack } from "@chakra-ui/react";
import theme from "../styles/theme";
import { AuthProvider, useAuth } from "../hooks/auth";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

function MyApp({ Component, pageProps }: AppProps) {
  const { user } = useAuth();
 

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        {!user ? (
          <Component {...pageProps} />
        ) : (
          <VStack w="full" h="full">
            <nav> oi</nav>
            <Component {...pageProps} />
          </VStack>
        )}
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
export default MyApp;
