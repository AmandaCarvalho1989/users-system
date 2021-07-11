import React, { useState } from "react";
import { HiTrash } from "react-icons/hi";
import { MdSave } from "react-icons/md";
import {
  Heading,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText,
  Stack,
  Radio,
  RadioGroup,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { GetServerSideProps } from "next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { deleteUser, updateUser } from "../../../services/user";
import { IUser } from "../../../types/User";
import { api } from "../../../services/api";
import { useRouter } from "next/router";
import InputMask from "react-input-mask";
import { FileUpload } from "../../../components/InputFile";
import { Modal } from "../../../components/Modal";
import { useAuth } from "../../../hooks/auth";

const CreateUserSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  birthDate: yup.string().required(),
  document: yup.string().required(),
  role: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6),
});

interface EditUserPageProps {
  user: IUser;
}
export const EditUser: React.FC<EditUserPageProps> = ({ user }) => {
  const [img, setImg] = useState(user.picture);

  const toast = useToast();
  const router = useRouter();
  const { signOut } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty, errors },
  } = useForm<IUser>({
    defaultValues: user,
    resolver: yupResolver(CreateUserSchema),
  });

  const onSubmit = async (data: IUser) => {
    if (!isDirty) return;
    await updateUser({ ...data, picture: img })
      .then((response) => {
        toast({
          position: "top-right",
          title: "Sucesso",
          description: "Usuário atualizado com sucesso",
          status: "success",
        });
        updateUser(response);
        router.back();
      })
      .catch(() => {
        toast({
          position: "top-right",
          title: "Erro",
          description: "Houve um erro ao tentar atualizar.",
          status: "success",
        });
      });
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
        signOut();
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

  return (
    <VStack
      w="full"
      h="full"
      px="2rem"
      py="1rem"
      alignItems="flex-start"
      spacing="1rem"
    >
      <Heading size="md" color="purple.300">
        {" "}
        Editar usuário
      </Heading>
      <VStack
        w="full"
        h="full"
        as="form"
        py="16px"
        spacing="1rem"
        bgColor="white"
        borderRadius="md"
        p="2rem"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack
          w="full"
          spacing="1rem"
          direction={["column", "column", "row", "row"]}
          justifyContent="center"
          alignItems="center"
        >
          <Stack w="240px" h="192px" borderRadius="md" position="relative">
            <FormControl
              isInvalid={!!errors.picture}
              isRequired
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FileUpload
                src={img}
                {...register("picture")}
                onChange={(e) => setImg(e)}
              />

              <FormHelperText>
                {errors.picture && errors?.picture.message}
              </FormHelperText>
            </FormControl>
          </Stack>
          <VStack w="full">
            <Stack direction={["column", "column", "row", "row"]} w="full">
              <FormControl id="firstName">
                <FormLabel>Nome </FormLabel>
                <Input {...register("firstName")} />
                {errors.firstName && (
                  <FormHelperText color="red.400">
                    {" "}
                    {errors.firstName.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl id="lastName">
                <FormLabel>Sobrenome </FormLabel>
                <Input {...register("lastName")} />
                {errors.lastName && (
                  <FormHelperText color="red.400">
                    {" "}
                    {errors.lastName.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
            <Stack direction={["column", "column", "row", "row"]} w="full">
              <FormControl id="birthDate">
                <FormLabel>Data Nascimento </FormLabel>
                <Input type="date" {...register("birthDate")} />
                {errors.birthDate && (
                  <FormHelperText color="red.400">
                    {" "}
                    {errors.birthDate.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl id="document">
                <FormLabel>Documento (CPF) </FormLabel>
                <Input
                  {...register("document")}
                  as={InputMask}
                  mask="***.***.***-**"
                />
                {errors.document && (
                  <FormHelperText color="red.400">
                    {" "}
                    {errors.document.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
          </VStack>
        </Stack>
        <Stack direction={["column", "column", "row", "row"]} w="full">
          <FormControl id="email">
            <FormLabel>Email </FormLabel>
            <Input type="email" {...register("email")} />
            {errors.email && (
              <FormHelperText color="red.400">
                {" "}
                {errors.email.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl id="password">
            <FormLabel>Senha </FormLabel>
            <Input type="password" {...register("password")} />
            {errors.password && (
              <FormHelperText color="red.400">
                {" "}
                {errors.password.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl id="role" pl="1rem">
            <FormLabel>Função </FormLabel>
            <RadioGroup
              {...register("role")}
              colorScheme="purple"
              defaultValue="ADMIN"
              onChange={(e) => setValue("role", e)}
            >
              <Radio value="ADMIN" defaultChecked>
                Administrador
              </Radio>
              <Radio value="USER">Usuário</Radio>
            </RadioGroup>
          </FormControl>
        </Stack>

        <HStack w="full" justifyContent="flex-end" pt="2rem">
          <Button
            size="md"
            leftIcon={<HiTrash />}
            colorScheme="red"
            onClick={onOpen}
          >
            Deletar usuário
          </Button>
          <Button
            type="submit"
            size="md"
            leftIcon={<MdSave />}
            colorScheme="purple"
          >
            Atualizar usuário
          </Button>
        </HStack>
      </VStack>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Deletar usuário"
        description={`Tem certeza que deseja deletar o usuário " ${user.firstName} "? Você será deslogado após fazer isso `}
        primaryButtonText="Deletar"
        onActionButtonClick={() => handleDeleteUser(user.id)}
      />
    </VStack>
  );
};

export default EditUser;

export const getServerSideProps: GetServerSideProps<EditUserPageProps> = async (
  context
) => {
  const { id } = context.query;
  const response = await api.get(`users/${id}`);

  if (!response.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: response.data,
    }, // will be passed to the page component as props
  };
};
