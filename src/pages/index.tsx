import React, { useEffect, useState } from "react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Heading,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Table, { HeaderData } from "../components/Table";
import {  loadUsers } from "../services/user";
import { formatDate, formatDocument } from "../utils/format";
import ModalDeleteUser from "../components/ModalDeleteUser";
import { IUser } from "../types/User";

const headers: HeaderData[] = [
  { key: "name", label: "Name" },
  { key: "document", label: "Document" },
  { key: "birthDate", label: "BirthDate" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
];

export const Home: React.FC = () => {
  const [data, setData] = useState<Array<any>>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userToDelete, setUserToDelete] = useState<IUser | undefined>(
    undefined
  );

  useEffect(() => {
    loadUsers().then((response) => {
      const formattedData = response.map((item: any) => ({
        ...item,
        birthDate: formatDate(item.birthDate),
        document: formatDocument(item.document),
        name: item.firstName + " " + item.lastName,
      }));

      setData(formattedData);
    });
  }, []);

  const handleDeleteUser = async (user: IUser) => {
    setUserToDelete(user);
    onOpen();
  };

  return (
    <VStack w="full" h="full" p="2rem" alignItems="flex-start">
      <Heading size="lg" color="purple.300">
        {" "}
        Users
      </Heading>
      <HStack w="full">
        <FormControl id="user" w="540px">
          <FormLabel>Search by user name </FormLabel>
          <Input type="search" placeholder="Type a name" />
        </FormControl>
        <FormControl id="role">
          <FormLabel>Search by user name </FormLabel>
          <Select placeholder="Select option" w="240px">
            <option value="option1">Todas</option>
            <option value="option2">Admin </option>
            <option value="option3">User</option>
          </Select>
        </FormControl>
        <Button w="sm" leftIcon={<PlusSquareIcon />} colorScheme="purple">
          Criar usuário
        </Button>
      </HStack>
      <VStack h="full" w="full" py="3rem">
        <Table
          headerData={headers}
          bodyData={data}
          onDeleteClick={handleDeleteUser}
        />
        {userToDelete && (
          <ModalDeleteUser
            isOpen={isOpen}
            onClose={onClose}
            user={userToDelete}
          />
        )}
      </VStack>
    </VStack>
  );
};

export default Home;
