import React, { useState } from "react";

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
import { createUser } from "../../services/user";
import { IUser } from "../../types/User";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { MdSave } from "react-icons/md";

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
  const toast = useToast();
  const router = useRouter();

  const [{ alt, src }, setImg] = useState({
    src: "https://king.host/blog/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png",
    alt: "Upload an Image",
  });

  const handleImg = (e: any) => {
    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
      const data = new FormData();
      data.append("avatar", e.target.files[0]);
      // await api.patch('/users/avatar', data).then(response => {
      //   updateUser(response.data);
    }
  };

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
    await createUser(data)
      .then(() => {
        toast({
          position: "top-right",
          title: "Sucesso",
          description: "Usuário cadastrado com sucesso",
          status: "success",
        });
        router.back();
      })
      .catch(() => {
        toast({
          position: "top-right",
          title: "Erro",
          description: "Houve um erro ao tentar cadastrar.",
          status: "success",
        });
      });
  };

  return (
    <VStack w="full" h="full" p="2rem" alignItems="flex-start" spacing="2rem">
      <Heading size="lg" color="purple.300">
        {" "}
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
        <HStack w="full" spacing="1rem">
          <Stack
            w="240px"
            h="192px"
            borderRadius="md"
            position="relative"
            bg="gray.300"
          >
            {/* <Image w="full" h="full" src={src} alt={alt} />
            <label htmlFor="avatar" style={{
              position: 'absolute',
            }}>
              <Input
                type="file"
                id="avatar"
                onChange={handleImg}
                display='none'
               
              />
              <Button>+</Button>
            </label> */}
          </Stack>
          <VStack w="full">
            <HStack w="full">
              <FormControl id="firstName">
                <FormLabel>Nome </FormLabel>
                <Input type="firstName" {...register("firstName")} />
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
            </HStack>
            <HStack w="full">
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
            </HStack>
          </VStack>
        </HStack>
        <HStack w="full">
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
              {/* <HStack spacing="1rem"> */}
              <Radio value="ADMIN" defaultChecked>
                Administrador
              </Radio>
              <Radio value="USER">Usuário</Radio>
              {/* </HStack> */}
            </RadioGroup>
          </FormControl>
        </HStack>
        <HStack w="full" justifyContent="flex-end" pt="2rem">
          <Button
            size="md"
            leftIcon={<MdSave />}
            colorScheme="purple"
            type="submit"
          >
            Salvar usuário
          </Button>
          {/* <Button
            w="sm"
            leftIcon={<PlusSquareIcon />}
            colorScheme="purple"
            onClick={() => ""}
          >
            Salvar usuário
          </Button> */}
        </HStack>
      </VStack>
    </VStack>
  );
};

export default NewUser;
