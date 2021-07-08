import React, { FormEvent, useState } from "react";

import { HStack, Text } from "@chakra-ui/react";

export const Home: React.FC = () => {
  return (
    <HStack
      w="100vw"
      h="100vh"
      bgColor="green.600"
      position="relative"
      spacing={0}
    >
      <Text> Dashboard</Text>
    </HStack>
  );
};

export default Home;
