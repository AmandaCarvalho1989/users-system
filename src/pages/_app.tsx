import { useEffect } from "react";
import type { AppProps } from "next/app";
import {
  ChakraProvider,
  VStack,
  HStack,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { AuthProvider, useAuth } from "../hooks/auth";
import { Header } from "../components/Header";
import { SideNav } from "../components/SideNav";
import theme from "../styles/theme";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const { route } = useRouter();
  const noPrivateRoutes = ["/signin"];
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        {!noPrivateRoutes.includes(route) ? (
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
      </AuthProvider>
    </ChakraProvider>
  );
}
export default MyApp;
