/* eslint-disable react-hooks/rules-of-hooks */
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
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { usePaginator } from "chakra-paginator";
import Table, { HeaderData } from "../../components/Table";
import { deleteUser, loadUsers } from "../../services/user";
import { formatDate, formatDocument } from "../../utils/format";
import { Modal } from "../../components/Modal";
import { IUser } from "../../types/User";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/auth";
import Pagination from "../../components/Pagination";
import CardViewContainer from "../../components/CardViewContainer";
import { ViewsType } from "../../components/SwitchViewButtons";
import { SwitchViewButtons } from "../../components/SwitchViewButtons";
import { GetServerSideProps } from "next";
import { toast } from "react-toastify";
import { EmptyData } from "../../components/EmptyData";
import { LoadingContainer } from "../../components/LoadingContainer";
import InternalServerError from "../500";
import { api } from "../../services/api";

const headers: HeaderData[] = [
  { key: "name", label: "Nome" },
  { key: "document", label: "Documento" },
  { key: "birthDate", label: "Data Nascimento" },
  { key: "email", label: "Email" },
  { key: "role", label: "Função" },
];

interface UsersPageProps {
  users: Array<IUser>;
  status: number;
}

export const Users: React.FC<UsersPageProps> = ({ users, status }) => {
  if (status === 500) return <InternalServerError />;

  const [data, setData] = useState<Array<any>>(users);
  const [showData, setShowData] = useState<Array<any>>(users);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IUser | undefined>(
    undefined
  );
  const [viewMode, setViewMode] = useState<ViewsType>("grid");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [isLargerThan1900] = useMediaQuery("(min-width: 900px)");

  const { pagesQuantity, currentPage, setCurrentPage } = usePaginator({
    total: totalPages,
    initialState: {
      pageSize: 5,
      currentPage: 1,
    },
  });

  const isAdminUser = user ? user.role === "ADMIN" : false;
  const isCurrentUser = user?.id === userToDelete?.id;

  useEffect(() => {
    setIsLoading(true);
    loadUsers(currentPage).then((response) => {
      if (response) {
        const formattedData = response.data.map((item: any) => ({
          ...item,
          birthDate: formatDate(item.birthDate),
          document: formatDocument(item.document),
          name: item.firstName + " " + item.lastName,
        }));
        setTotalPages(response.headers["x-total-count"]);
        setData(formattedData);
        setShowData(formattedData);
        setIsLoading(false);
      }
    });

    return () => {};
  }, [isOpen, currentPage]);

  const handleOpenDeleteModal = async (user: IUser) => {
    setUserToDelete(user);
    onOpen();
  };

  const handleDeleteUser = async (userId: number) => {
    await deleteUser(userId)
      .then(() => {
        onClose();
        if (isCurrentUser) signOut();
        toast.success("Usuário deletado com sucesso.");
      })
      .catch(() => {
        toast.error("Houve um erro ao tentar deletar.");
      });
  };

  const handleSearchByUserName = (text: string) => {
    let filtered = data.filter((item) =>
      item.name.toLocaleLowerCase().startsWith(text.toLowerCase())
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

          <SwitchViewButtons value={viewMode} onChange={setViewMode} />
        </HStack>

        <Stack pt="2rem">
          <Button
            leftIcon={<HiPlus />}
            colorScheme="purple"
            variant="solid"
            onClick={() => router.push("/users/new")}
            display={isAdminUser ? "flex" : "none"}
          >
            Criar usuário
          </Button>
        </Stack>
      </HStack>
      <VStack h="full" w="full" py={"1rem"}>
        {isLoading ? (
          <LoadingContainer />
        ) : showData.length == 0 ? (
          <EmptyData />
        ) : viewMode == "card" || !isLargerThan1900 ? (
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
          description={`Tem certeza que deseja deletar o usuário " ${
            userToDelete.firstName
          } "? ${isCurrentUser ? "Você será deslogado após fazer isso " : ""}`}
          primaryButtonText="Deletar"
          onActionButtonClick={() => handleDeleteUser(userToDelete.id)}
        />
      )}
    </VStack>
  );
};

export default Users;

export const getServerSideProps: GetServerSideProps<UsersPageProps> = async (
  context
) => {
  try {
    const response = await api.get("/users", {
      params: {
        page: 1,
      },
    });
    const formattedData = response.data.map((item: any) => ({
      ...item,
      birthDate: formatDate(item.birthDate),
      document: formatDocument(item.document),
      name: item.firstName + " " + item.lastName,
    }));

    return {
      props: {
        users: formattedData,
        status: 200,
      }, // will be passed to the page component as props
    };
  } catch {
    return {
      props: {
        users: [],
        status: 500,
      },
    };
  }
};
