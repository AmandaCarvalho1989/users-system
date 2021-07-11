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
  FormHelperText,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const SigninSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6),
});

export const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<SignInCredentials>({
    resolver: yupResolver(SigninSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const onSubmit = async (data: SignInCredentials) => {
    if (!isDirty) return;
    setIsLoading(true);
    await signIn(data).finally(() => setIsLoading(false));
  };

  return (
    <HStack
      w="100vw"
      h="100vh"
      position="relative"
      spacing={0}
      alignItems="center"
      justifyContent="center"
      bgColor="purple.300"
      p={["1rem", "0"]}
    >
      <VStack
        display={["none", "none", "block", "block"]}
        h="full"
        w="2xl"
        bgColor="gray.50"
        position="relative"
      />
      <VStack
        h="full"
        flex="1"
        bgColor="purple.300"
        position="relative"
        display={["none", "none", "block", "block"]}
      />
      <VStack
        mt="50"
        left={["0", "0", "20%", "20%"]}
        bg="white"
        w="481px"
        h="552px"
        px="48px"
        zIndex="2"
        position={["relative", "relative", "absolute", "absolute"]}
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
            {errors.email && (
              <FormHelperText color="red.400">
                {" "}
                {errors.email.message}
              </FormHelperText>
            )}
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
            {errors.password && (
              <FormHelperText color="red.400">
                {" "}
                {errors.password.message}
              </FormHelperText>
            )}
          </FormControl>
          <Button
            w="full"
            colorScheme="purple"
            disabled={!isDirty || isLoading}
            size="md"
            type="submit"
            isLoading={isLoading}
            loadingText="Carregando"
          >
            Entrar
          </Button>
        </VStack>
      </VStack>
    </HStack>
  );
};

export default SignIn;
