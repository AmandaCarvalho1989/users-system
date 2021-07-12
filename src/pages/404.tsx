import React from "react";
import { Heading, VStack } from "@chakra-ui/react";
import Lottie from "react-lottie-player";
import NotFoundAnimation from "../animations/not-found.json";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <VStack w="full" h="full" bg="white" borderRadius="md" justify="center" >
      <Lottie
        loop
        animationData={NotFoundAnimation}
        play
        style={{ width: "100%", height: "12rem" }}
      />
      <Heading size="md">Opss, caminho não encontrado</Heading>
      <Link href='/users'>Voltar para a aplicação</Link>
    </VStack>
  );
};

export default NotFound;
