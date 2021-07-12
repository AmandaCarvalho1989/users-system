import React from "react";
import { Heading, VStack, Text } from "@chakra-ui/react";
import WIPAnimation from "../animations/wip.json";
import Lottie from "react-lottie-player";

export const Home: React.FC = () => {
  return (
    <VStack w="full" h="full" p="2rem" alignItems="flex-start">
      <Heading size="md" color="purple.300">
        Dashboard
      </Heading>
      <VStack w="full" h="full" bg="white" borderRadius="md" justify="center">
        <Lottie
          loop
          animationData={WIPAnimation}
          play
          style={{ width: "100%", height: "20rem" }}
        />
        <Heading size="md">Página em construção</Heading>
        <Text fontSize='lg'>Volte mais tarde</Text>
      </VStack>
    </VStack>
  );
};

export default Home;
