import React, { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import {
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  useToast,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { usePaginator } from "chakra-paginator";
import Table, { HeaderData } from "../../components/Table";
import { deleteUser, loadUsers } from "../../services/user";
import { formatDate, formatDocument } from "../../utils/format";
import { Modal } from "../../components/Modal";
import { IUser } from "../../types/User";
import { useRouter } from "next/dist/client/router";
import { useAuth } from "../../hooks/auth";
import Pagination from "../../components/Pagination";
import CardViewContainer from "../../components/CardViewContainer";
import SwitchViewButtons, {
  ViewsType,
} from "../../components/SwitchViewButtons";
import TransformControlsModeRadio from "../../components/SwitchViewButtons";

const headers: HeaderData[] = [
  { key: "name", label: "Nome" },
  { key: "document", label: "Documento" },
  { key: "birthDate", label: "Data Nascimento" },
  { key: "email", label: "Email" },
  { key: "role", label: "Função" },
];

export const Users: React.FC = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [showData, setShowData] = useState<Array<any>>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [userToDelete, setUserToDelete] = useState<IUser | undefined>(
    undefined
  );
  const [viewMode, setViewMode] = useState<ViewsType>("card");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const { user } = useAuth();
  const [isLargerThan1900] = useMediaQuery("(min-width: 900px)");

  const { pagesQuantity, currentPage, setCurrentPage } = usePaginator({
    total: totalPages,
    initialState: {
      pageSize: 5,
      currentPage: 1,
    },
  });

  const isAdminUser = user ? user.role === "ADMIN" : false;

  useEffect(() => {
    loadUsers(currentPage).then((response) => {
      const formattedData = response.data.map((item: any) => ({
        ...item,
        birthDate: formatDate(item.birthDate),
        document: formatDocument(item.document),
        name: item.firstName + " " + item.lastName,
      }));
      setTotalPages(response.headers["x-total-count"]);
      setData(formattedData);
      setShowData(formattedData);
    });
  }, [isOpen, currentPage]);

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
    <VStack
      w="full"
      h="full"
      px={["2rem", "1.3rem"]}
      py={["1.5rem", "0.8rem"]}
      alignItems="flex-start"
    >
      <HStack w="full" justifyContent="space-between" alignItems="center">
        <HStack w="full" alignItems="flex-end">
          <FormControl id="user" w={["min-content", "min-content", "md", "md"]}>
            <FormLabel>Pesquise pelo nome </FormLabel>
            <Input
              w={["min-content", "min-content", "md", "md"]}
              type="search"
              placeholder="Digite..."
              onChange={(e) => handleSearchByUserName(e.target.value)}
            />
          </FormControl>

          <TransformControlsModeRadio value={viewMode} onChange={setViewMode} />
        </HStack>
        <Stack pt="2rem">
          <Button
            size="md"
            alignItems="center"
            leftIcon={<HiPlus />}
            colorScheme="purple"
            onClick={() => router.push("/users/new")}
            display={isAdminUser ? "block" : "none"}
          >
            Criar usuário
          </Button>
        </Stack>
      </HStack>
      <VStack h="full" w="full" py={"1rem"}>
        {viewMode == "card" || !isLargerThan1900 ? (
          <CardViewContainer data={showData} />
        ) : (
          <Table
            headerData={headers}
            bodyData={showData}
            onDeleteClick={handleOpenDeleteModal}
            onEditClick={(user) => router.push(`/users/edit/${user.id}`)}
            hasPermission={isAdminUser}
          />
        )}
        <Pagination
          dataQuantity={totalPages}
          currentPage={currentPage}
          pagesQuantity={pagesQuantity}
          onPageChange={setCurrentPage}
        />
      </VStack>
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
  );
};

export default Users;
