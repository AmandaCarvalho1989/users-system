import React from "react";

import { HStack, Text, VStack, Image } from "@chakra-ui/react";
import { useAuth } from "../hooks/auth";
import { useRouter } from "next/router";
import { IUser } from "../types/User";

export const Header: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleGoToProfile = () => {
    router.push("/users/profile");
  };

  return (
    <HStack
      as="header"
      bgColor="white"
      w="full"
      minH="64px"
      px="2rem"
      display={["none", "none", "none", "flex"]}
    >
      <HStack
        w="full"
        justifyContent="flex-end"
        spacing="1rem"
        cursor="pointer"
        onClick={handleGoToProfile}
      >
        <Image
          w="3rem"
          h="3rem"
          borderRadius="md"
          objectFit="cover"
          src={user?.picture || "/images/placeholder.png"}
          alt={user?.firstName}
        />
        <VStack
          spacing={0}
          alignItems="flex-start"
          display={["none", "none", "block", "block"]}
        >
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
