import React from "react";
import { Heading, VStack, Text } from "@chakra-ui/react";
import Lottie from "react-lottie-player";
import LoadingAnimation from "../animations/loading.json";

export const LoadingContainer: React.FC = () => {
  return (
    <VStack w="full" h="full" bg="white" borderRadius="md" justify="center">
      <Lottie
        loop
        animationData={LoadingAnimation}
        play
        style={{ width: "100%", height: "15rem" }}
      />
      <Heading size="md">Carregando...</Heading>
      <Text>Aguarde alguns instantes</Text>
    </VStack>
  );
};

export default LoadingContainer;
