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
import { IUser } from "../../types/User";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/auth";
import { FileUpload } from "../../components/InputFile";
import InputDocument from "../../components/InputDocument";

export const Profile: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

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
              isRequired
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FileUpload
                src={user?.picture || "/images/placeholder.png"}
                isReadOnly
              />
            </FormControl>
          </Stack>
          <VStack w="full">
            <Stack direction={["column", "column", "row", "row"]} w="full">
              <FormControl id="firstName">
                <FormLabel>Nome </FormLabel>
                <Input
                  readOnly
                  data-testid="firstName"
                  value={user?.firstName}
                />
              </FormControl>
              <FormControl id="lastName">
                <FormLabel>Sobrenome </FormLabel>
                <Input readOnly value={user?.lastName} />
              </FormControl>
            </Stack>
            <Stack direction={["column", "column", "row", "row"]} w="full">
              <FormControl id="birthDate">
                <FormLabel>Data Nascimento </FormLabel>
                <Input readOnly type="date" value={user?.birthDate} />
              </FormControl>
              <FormControl id="document">
                <FormLabel>Documento (CPF) </FormLabel>
                <InputDocument value={user?.document} readonly />
              </FormControl>
            </Stack>
          </VStack>
        </Stack>
        <Stack direction={["column", "column", "row", "row"]} w="full">
          <FormControl id="email">
            <FormLabel>Email </FormLabel>
            <Input type="email" readOnly value={user?.email} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Senha </FormLabel>
            <Input type="password" readOnly value={user?.password} />
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
