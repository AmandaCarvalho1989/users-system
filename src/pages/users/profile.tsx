import React from "react";
import { HiPencilAlt } from "react-icons/hi";
import InputMask from "react-input-mask";
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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateUser } from "../../services/user";
import { IUser } from "../../types/User";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/auth";
import { FileUpload } from "../../components/InputFile";
import { toast } from "react-toastify";

const CreateUserSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  birthDate: yup.string().required(),
  document: yup.string().required(),
  role: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6),
  picture: yup.string(),
});

export const Profile: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<IUser>({
    defaultValues: user,
    resolver: yupResolver(CreateUserSchema),
  });

  const onSubmit = async (data: IUser) => {
    if (!isDirty) return;

    await updateUser(data)
      .then(() => {
        toast.success("Usuário atualizado com sucesso");
        router.back();
      })
      .catch(() => {
        toast.error("Houve um erro ao tentar atualizar.");
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
        Perfil
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
                {...register("picture")}
                src={user?.picture || "/images/placeholder.png"}
                isReadOnly
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
                <Input readOnly {...register("firstName")} />
                {errors.firstName && (
                  <FormHelperText color="red.400">
                    {" "}
                    {errors.firstName.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl id="lastName">
                <FormLabel>Sobrenome </FormLabel>
                <Input readOnly {...register("lastName")} />
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
                <Input readOnly type="date" {...register("birthDate")} />
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
                  readOnly
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
            <Input type="email" readOnly {...register("email")} />
            {errors.email && (
              <FormHelperText color="red.400">
                {" "}
                {errors.email.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl id="password">
            <FormLabel>Senha </FormLabel>
            <Input type="password" readOnly {...register("password")} />
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
              value={user?.role}
            >
              <Radio value="ADMIN" defaultChecked={user?.role === "ADMIN"}>
                Administrador
              </Radio>
              <Radio value="USER" defaultChecked={user?.role === "USER"}>
                Usuário
              </Radio>
            </RadioGroup>
          </FormControl>
        </Stack>
        <HStack w="full" justifyContent="flex-end" pt="2rem">
          <Button
            onClick={() => router.push(`/users/edit/${user.id}`)}
            size="md"
            leftIcon={<HiPencilAlt />}
            colorScheme="purple"
          >
            Editar usuário
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Profile;
