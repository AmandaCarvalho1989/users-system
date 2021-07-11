import React from "react";

import {
  Paginator,
  Container,
  Previous,
  Next,
  PageGroup,
} from "chakra-paginator";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { ButtonProps, HStack, Icon, Text } from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  pagesQuantity: number;
  dataQuantity: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pagesQuantity,
  dataQuantity,
  onPageChange,
}) => {

  const baseStyles: ButtonProps = {
    w: 8,
    h: 8,
    fontSize: "sm",
    marginX: 1,
  };

  const normalStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: "purple.200",
    },
    color: "purple.500",
  };

  const activeStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: "purple.500",
    },
    bg: "purple.400",
    color: "white",
  };

  return (
    <HStack w="full" justifyContent="space-between">
      <Text w="full" color="gray">
        {" "}
        Total de {dataQuantity} resultados{" "}
      </Text>
      <Paginator
        normalStyles={normalStyles}
        activeStyles={activeStyles}
        currentPage={currentPage}
        innerLimit={2}
        outerLimit={2}
        pagesQuantity={pagesQuantity}
        onPageChange={onPageChange}
      >
        <Container justify="flex-end" w="full" p={4} pr={10}>
          <Previous w={8} h={8}>
            <Icon w={5} h={5} color="purple.500" as={HiChevronLeft} />
          </Previous>
          <PageGroup isInline align="center" />
          <Next w={8} h={8}>
            <Icon w={5} h={5} color="purple.500" as={HiChevronRight} />
          </Next>
        </Container>
      </Paginator>
    </HStack>
  );
};

export default Pagination;
