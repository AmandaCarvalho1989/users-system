import React, { ReactNode } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalProps,
  Text,
} from "@chakra-ui/react";
import { IUser } from "../types/User";
import { deleteUser } from "../services/user";

interface ModalDeleteUserProps extends Omit<ModalProps, "children"> {
  user: IUser;
}

export const ModalDeleteUser: React.FC<ModalDeleteUserProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const handleDeleteUser = async () => {
    await deleteUser(user.id).then(() => onClose())
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent alignSelf='center'>
        <ModalHeader>Deletar usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Você tem certeza que quer deletar o usuário {`"${user.firstName}"`}{" "}
            ?{" "}
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleDeleteUser}>
            Deletar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDeleteUser;
