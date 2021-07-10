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
  useToast,
} from "@chakra-ui/react";
import Table, { HeaderData } from "../../components/Table";
import { deleteUser, loadUsers } from "../../services/user";
import { formatDate, formatDocument } from "../../utils/format";
import { Modal } from "../../components/Modal";
import { IUser } from "../../types/User";
import { useRouter } from "next/dist/client/router";
import { useAuth } from "../../hooks/auth";

const headers: HeaderData[] = [
  { key: "name", label: "Name" },
  { key: "document", label: "Document" },
  { key: "birthDate", label: "BirthDate" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
];

export const Users: React.FC = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [showData, setShowData] = useState<Array<any>>([]);
  const [userToDelete, setUserToDelete] = useState<IUser | undefined>(
    undefined
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const { user } = useAuth();

  const isAdminUser = user ? user.role === "ADMIN" : false;

  useEffect(() => {
    console.log(user);
  }, []);

  useEffect(() => {
    loadUsers().then((response) => {
      const formattedData = response.map((item: any) => ({
        ...item,
        birthDate: formatDate(item.birthDate),
        document: formatDocument(item.document),
        name: item.firstName + " " + item.lastName,
      }));

      setData(formattedData);
      setShowData(formattedData);
    });
  }, [isOpen]);

  const handleOpenDeleteModal = async (user: IUser) => {
    setUserToDelete(user);
    onOpen();
  };
  const handleDeleteUser = async (userId: number) => {
    await deleteUser(userId)
      .then(() => {
        onClose();
        toast({
          position: "top-right",
          title: "Sucesso",
          description: "Usuário deletado com sucesso",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          position: "top-right",
          title: "Erro",
          description: "Houve um erro ao tentar deletar o usuáriou.",
          status: "success",
        });
      });
  };

  const handleSearchByUserName = (text: string) => {
    let filtered = data.filter((item) =>
      item.name.toLocaleLowerCase().includes(text.toLowerCase())
    );
    setShowData(filtered);
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
          <Input
            type="search"
            placeholder="Type a name"
            onChange={(e) => handleSearchByUserName(e.target.value)}
          />
        </FormControl>
        <FormControl id="role">
          <FormLabel>Search by user name </FormLabel>
          <Select placeholder="Select option" w="240px">
            <option value="option1">Todas</option>
            <option value="option2">Admin </option>
            <option value="option3">User</option>
          </Select>
        </FormControl>
        <Button
          w="sm"
          leftIcon={<PlusSquareIcon />}
          colorScheme="purple"
          onClick={() => router.push("/users/new")}
          display={isAdminUser ? "block" : "none"}
        >
          Criar usuário
        </Button>
      </HStack>
      <VStack h="full" w="full" py="3rem">
        <Table
          headerData={headers}
          bodyData={showData}
          onDeleteClick={handleOpenDeleteModal}
          onEditClick={(user) => router.push(`/users/edit/${user.id}`)}
          hasPermission={isAdminUser}
        />

        {userToDelete && (
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Deletar usuário"
            description={`Tem certeza que deseja deletar o usuário " ${userToDelete.firstName} " `}
            primaryButtonText="Deletar"
            onActionButtonClick={() => handleDeleteUser(userToDelete.id)}
          />
        )}
      </VStack>
    </VStack>
  );
};

export default Users;
