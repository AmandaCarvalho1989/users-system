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
  useDisclosure,
} from "@chakra-ui/react";
import { HiTemplate, HiUser, HiAcademicCap, HiLogout } from "react-icons/hi";
import { useRouter } from "next/dist/client/router";
import { useAuth } from "../hooks/auth";
import { Modal } from "./Modal";

const menuItems = [
  {
    name: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: HiTemplate,
  },
  {
    name: "users",
    label: "Usuários",
    path: "/users",
    icon: HiUser,
  },
  {
    name: "projects",
    label: "Projetos",
    path: "/projects",
    icon: HiAcademicCap,
  },
];

export const SideNav: React.FC = () => {
  const { pathname } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { signOut } = useAuth();

  const checkIfIsActive = (value: string) => {
    if (value === "/") return value === pathname;
    else return value === pathname || pathname.includes(value);
  };

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
      <Heading color="white" size="md" alignSelf="flex-start">
        LOGO
      </Heading>
      <List spacing="1rem" w="full" fontWeight="600">
        {menuItems.map((item) => (
          <ListItem as={Link} href={item.path} key={item.name}>
            <ChakraLink
              display="flex"
              alignItems="center"
              h="3rem"
              px="1rem"
              borderRadius="md"
              bgColor={
                checkIfIsActive(item.path) ? "purple.500" : "transparent"
              }
              color={checkIfIsActive(item.path) ? "white" : "purple.50"}
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

      <HStack w="full" color="white" cursor="pointer" onClick={onOpen}>
        <Icon as={HiLogout} w={6} h={6} />
        <Text>Sair</Text>
      </HStack>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Sair da aplicação"
        description="Tem certeza que deseja sair? "
        primaryButtonText="Sair"
        onActionButtonClick={signOut}
      />
    </VStack>
  );
};

export default SideNav;
