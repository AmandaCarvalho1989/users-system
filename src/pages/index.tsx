import React from "react";
import { Heading, VStack } from "@chakra-ui/react";

export const Home: React.FC = () => {
  return (
    <VStack w="full" h="full" p="2rem" alignItems="flex-start">
      <Heading size="md" color="purple.300">
        Dashboard
      </Heading>
    </VStack>
  );
};

export default Home;
