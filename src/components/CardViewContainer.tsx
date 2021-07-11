import React from "react";

import { Text, HStack, Box, Image, SimpleGrid, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/auth";

interface CardViewContainer {
  data: Array<any>;
}

const CardViewContainer: React.FC<CardViewContainer> = ({ data }) => {
  const router = useRouter();

  const { user } = useAuth();

  const isAdminUser = user ? user.role === "ADMIN" : false;
  return (
    <SimpleGrid columns={[2, null, 3]} spacing="1rem">
      {data.map((item) => (
        <HStack
          cursor={isAdminUser ? "pointer" : "default"}
          minW="full"
          w={["full", "full", "full", "350px"]}
          key={item.id}
          p={4}
          display={{ md: "flex" }}
          bgColor="white"
          borderRadius="md"
          h={["auto", "100px"]}
          alignItems="center"
          onClick={() => isAdminUser && router.push(`/users/edit/${item.id}`)}
        >
          <Image
            borderRadius="lg"
            width={20}
            height={20}
            objectFit="cover"
            display={["none", "none", "none", "block"]}
            src={item.picture || "/images/placeholder.png"}
            alt={item.name}
          />
          <Box
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <Text fontWeight="bold" fontSize="md" color="purple.400">
              {item.name} - {item.role}
            </Text>

            <Stack direction={["column", "row"]}>
              <Text color="gray.500" fontSize="sm">
                {item.birthDate}
              </Text>
              <Text color="gray.500" fontSize="sm">
                {" "}
                {item.document}
              </Text>
            </Stack>
            <Text color="gray.500" fontSize="sm">
              {" "}
              {item.email}
            </Text>
          </Box>
        </HStack>
      ))}
    </SimpleGrid>
  );
};

export default CardViewContainer;
