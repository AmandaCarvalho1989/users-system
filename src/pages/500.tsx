import React from "react";
import { Heading, VStack, Text } from "@chakra-ui/react";
import Lottie from "react-lottie-player";
import ServerErrorAnimation from "../animations/server-error.json";

const InternalServerError: React.FC = () => {
  return (
    <VStack w="full" h="full" bg="white" borderRadius="md" justify="center" >
      <Lottie
        loop
        animationData={ServerErrorAnimation}
        play
        style={{ width: "100%", height: "12rem" }}
      />
      <Heading size="md">Opss, houve um erro</Heading>
      <Text fontSize='lg'>Tente novamente mais tarde</Text>
    </VStack>
  );
};

export default InternalServerError;
