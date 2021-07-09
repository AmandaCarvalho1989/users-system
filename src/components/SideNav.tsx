import React, { useEffect } from "react";
import Link from "next/link";
import {
  Text,
  VStack,
  Heading,
  List,
  ListIcon,
  ListItem,
  Link as ChakraLink,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { HiTemplate, HiUser, HiAcademicCap, HiLogout } from "react-icons/hi";
import { useRouter } from "next/dist/client/router";
import { useAuth } from "../hooks/auth";

const menuItems = [
  {
    name: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: HiTemplate,
  },
  {
    name: "users",
    label: "Users",
    path: "/users",
    icon: HiUser,
  },
  {
    name: "projects",
    label: "Projects",
    path: "/projects",
    icon: HiAcademicCap,
  },
];

export const SideNav: React.FC = () => {
  const { pathname } = useRouter();

  const { signOut } = useAuth();

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
      <Heading color="white" size='md' alignSelf="flex-start">
        LOGO
      </Heading>
      <List spacing="1rem" w="full" fontWeight="600">
        {menuItems.map((item) => (
          <ListItem as={Link} href="/" key={item.name}>
            <ChakraLink
              display="flex"
              alignItems="center"
              h="3rem"
              px="1rem"
              borderRadius="md"
              bgColor={pathname === item.path ? "purple.500" : "transparent"}
              color={pathname === item.path ? "white" : "purple.50"}
            >
              <ListIcon as={item.icon} w={6} h={6} />
              <Text mt="2px" fontSize="lg">
                {" "}
                {item.label}
              </Text>
            </ChakraLink>
          </ListItem>
        ))}
      </List>

      <HStack w="full" color="white" cursor="pointer" onClick={signOut}>
        <Icon as={HiLogout} w={6} h={6} />
        <Text>Logout</Text>
      </HStack>
    </VStack>
  );
};

export default SideNav;
