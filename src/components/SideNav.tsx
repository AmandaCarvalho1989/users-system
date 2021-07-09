import React from "react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Text,
  VStack,
  Heading,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";

export const SideNav: React.FC = () => {
  return (
    <VStack
      as="nav"
      h="full"
      w="xs"
      bgColor="purple.300"
      position="relative"
      py="2rem"
      px="1.5rem"
      justifyContent="space-between"
    >
      <Heading color="white" alignSelf="flex-start">
        LOGO
      </Heading>
      <List spacing="2rem" color="white" w="full" fontWeight="600">
        <ListItem display="flex" alignItems="center">
          <ListIcon as={CheckCircleIcon} w={6} h={6} />
          <Text fontSize="lg"> Dashboard</Text>
        </ListItem>
        <ListItem display="flex" alignItems="center">
          <ListIcon as={CheckCircleIcon} w={6} h={6} />
          <Text fontSize="lg"> Users</Text>
        </ListItem>
        <ListItem display="flex" alignItems="center">
          <ListIcon as={CheckCircleIcon} w={6} h={6} />
          <Text fontSize="lg"> Projects </Text>
        </ListItem>
      </List>

      <Heading color="white" alignSelf="flex-start">
        LOGO
      </Heading>
    </VStack>
  );
};

export default SideNav;
