import React from "react";

import { HStack, Text, VStack, Image } from "@chakra-ui/react";
import { useAuth } from "../hooks/auth";

export const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <HStack as="header" bgColor="white" w="full" h="72px" px="64px">
      <HStack w="full" justifyContent="flex-end" spacing="1rem">
        <Image
          w="3rem"
          h="3rem"
          borderRadius="md"
          objectFit="cover"
          src="https://www.urbansplash.co.uk/images/placeholder-16-9.jpg"
          alt={user?.firstName}
        />
        <VStack spacing={0} alignItems="flex-start">
          <Text fontw={6} h={6} fontWeight="700" color="gray.800" m="0">
            {" "}
            {`${user?.firstName} ${user?.lastName}`}
          </Text>
          <Text fontWeight="500" color="gray.400" m="0">
            {user?.role}
          </Text>
        </VStack>
      </HStack>
    </HStack>
  );
};

export default Header;
