import React, { useState } from "react";

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
import { createUser } from "../../services/user";
import { IUser } from "../../types/User";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { MdSave } from "react-icons/md";
import { FileUpload } from "../../components/InputFile";
import { toast } from "react-toastify";
//@ts-ignore
import * as yup from "yup";
import InputDocument from "../../components/InputDocument";

type CreateUser = Omit<IUser, "id">;

const CreateUserSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  birthDate: yup.string().required(),
  document: yup.string().required(),
  role: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6),
});

export const NewUser: React.FC = () => {
  const router = useRouter();

  const [img, setImg] = useState("");
  const [document, setDocument] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
    setValue,
  } = useForm<CreateUser>({
    resolver: yupResolver(CreateUserSchema),
  });

  const onSubmit = async (data: CreateUser) => {
    if (!isDirty) return;
    await createUser({ ...data, picture: img })
      .then(() => {
        toast.success("Usuário cadastrado com sucesso");
        router.back();
      })
      .catch((error) => {
        toast.error(error.message);
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
        Criar usuário
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
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FileUpload
                {...register("picture")}
                src={img}
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

                <InputDocument
                  {...register("document")}
                  value={document}
                  onChange={(e: string) => {
                    setDocument(e);
                    setValue("document", e);
                  }}
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
            leftIcon={<MdSave />}
            colorScheme="purple"
            type="submit"
          >
            Salvar usuário
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default NewUser;
