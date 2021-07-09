import React, { FormEvent, useState } from "react";
import { SignInCredentials, useAuth } from "../hooks/auth";
import {
  Heading,
  HStack,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { useForm } from "react-hook-form";

export const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: SignInCredentials) => {
    await signIn(data);
  };

  return (
    <HStack
      w="100vw"
      h="100vh"
      bgColor="green.600"
      position="relative"
      spacing={0}
    >
      <VStack h="full" w="2xl" bgColor="gray.50" position="relative" />
      <VStack h="full" flex="1" bgColor="purple.300" position="relative" />
      <VStack
        mt="50"
        left="20%"
        bg="white"
        w="481px"
        h="552px"
        px="48px"
        zIndex="2"
        position="absolute"
        justifyContent="center"
        alignItems="start"
        borderRadius="lg"
      >
        <Heading size="lg" color="purple.300">
          Boas vindas!
        </Heading>
        <Text fontSize="lg" fontWeight="medium" color="gray.800">
          Faça seu login para ter acesso ao sistema!
        </Text>
        <VStack
          as="form"
          w="full"
          py="16px"
          spacing="24px"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl id="email">
            <FormLabel>Email </FormLabel>
            <Input type="email" {...register("email")} />
          </FormControl>
          <FormControl id="password" pb="24px">
            <FormLabel>Senha</FormLabel>
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                placeholder="Enter password"
                {...register("password")}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  variant="ghost"
                  onClick={handleClick}
                >
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button w="full" colorScheme="purple" size="md" type="submit">
            Entrar
          </Button>
        </VStack>
      </VStack>
    </HStack>
  );
};

export default SignIn;
