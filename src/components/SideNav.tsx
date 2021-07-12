import React from "react";
import Link from "next/link";
import {
  Text,
  Image,
  Heading,
  List,
  ListIcon,
  ListItem,
  Link as ChakraLink,
  HStack,
  Icon,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { HiTemplate, HiUser, HiLogout } from "react-icons/hi";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/auth";
import { Modal } from "./Modal";
import { useMediaQuery } from "@chakra-ui/react";

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
];

export const SideNav: React.FC = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  const { signOut, user } = useAuth();

  const checkIfIsActive = (value: string) => {
    if (value === "/") return value === router.pathname;
    else return value === router.pathname || router.pathname.includes(value);
  };

  return (
    <Stack
      direction={["row", "row", "column", "column"]}
      as="nav"
      h={["4rem", "4rem", "full", "full"]}
      minW={["full", "full", "18vw", "18vw"]}
      bgColor="purple.300"
      position="relative"
      py={["2rem", "1.3rem"]}
      px={["1.5rem", "1rem"]}
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading
        color="white"
        size={isLargerThan1280 ? "md" : "sm"}
        alignSelf="flex-start"
      >
        LOGO
      </Heading>
      <List
        spacing={["0", "0", "1rem", "1rem"]}
        w="full"
        fontWeight="600"
        display="flex"
        flexDirection={["row", "row", "column", "column"]}
      >
        {menuItems.map((item) => (
          <ListItem as={Link} w="full" href={item.path} key={item.name}>
            <ChakraLink
              display="flex"
              alignItems="center"
              h="3rem"
              px={["1rem", "0.5rem"]}
              borderRadius="md"
              bgColor={
                checkIfIsActive(item.path) ? "purple.500" : "transparent"
              }
              color={checkIfIsActive(item.path) ? "white" : "purple.50"}
            >
              <ListIcon
                as={item.icon}
                w={6}
                h={6}
                marginInlineEnd={isLargerThan1280 ? "0.5" : "0"}
              />

              <Text
                pl="0.5rem"
                mt="2px"
                fontSize="lg"
                display={["none", "none", "none", "block"]}
              >
                {" "}
                {item.label}
              </Text>
            </ChakraLink>
          </ListItem>
        ))}
      </List>
      <Image
        display={["block", "block", "block", "none"]}
        w="3rem"
        h="3rem"
        borderRadius="md"
        objectFit="cover"
        src={user?.picture ?? "/images/placeholder.png"}
        alt={user?.firstName}
        onClick={() => router.push("/users/profile")}
      />

      <HStack
        w={["auto", "auto", "full", "full"]}
        color="white"
        cursor="pointer"
        onClick={onOpen}
      >
        <Icon as={HiLogout} w={6} h={6} />
        <Text display={["none", "none", "none", "block"]}>Sair</Text>
      </HStack>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Sair da aplicação"
        description="Tem certeza que deseja sair? "
        primaryButtonText="Sair"
        onActionButtonClick={signOut}
      />
    </Stack>
  );
};

export default SideNav;
