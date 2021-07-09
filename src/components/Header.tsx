import React from "react";

import { HStack, Text, VStack, Image } from "@chakra-ui/react";

export const Header: React.FC = () => {
  return (
    <HStack as="header" bgColor="white" w="full" h="72px" px="64px">
      <HStack w="full" justifyContent="flex-end" spacing="1rem">
        <Image
          w="3rem"
          h="3rem"
          borderRadius="md"
          src="https://avatars.githubusercontent.com/u/53491128?v=4"
          alt="Amanda Carvalho"
        />
        <VStack spacing={0} alignItems="flex-start">
          <Text fontw={6} h={6} fontWeight="700" color="gray.800" m="0">
            {" "}
            Amanda Carvalho
          </Text>
          <Text fontWeight="500" color="gray.400" m="0">
            {" "}
            Admin
          </Text>
        </VStack>
      </HStack>
    </HStack>
  );
};

export default Header;
