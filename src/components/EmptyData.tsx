import React from "react";
import { Heading, VStack, Text } from "@chakra-ui/react";
import Lottie from "react-lottie-player";
import EmptyDataAnimation from "../animations/empty-data.json";

export const EmptyData: React.FC = () => {
  return (
    <VStack w="full" h="full" bg="white" borderRadius="md" justify="center">
      <Lottie
        loop
        animationData={EmptyDataAnimation}
        play
        style={{ width: "100%", height: "15rem" }}
      />
      <Heading size="md">Nenhum usuário encontrado</Heading>
      <Text>Faça outra pesquisa ou tente novamente mais tarde</Text>
    </VStack>
  );
};

export default EmptyData;
