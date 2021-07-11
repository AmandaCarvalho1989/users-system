import React, { ReactNode } from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalProps as ChakraModalProps,
  Text,
} from "@chakra-ui/react";

interface ModalProps extends Omit<ChakraModalProps, "children"> {
  title: string;
  description: string;
  primaryButtonText: string;
  onActionButtonClick: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  description,
  primaryButtonText,
  onClose,
  onActionButtonClick,
}) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent alignSelf="center">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{description}</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onActionButtonClick}>
            {primaryButtonText}
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
