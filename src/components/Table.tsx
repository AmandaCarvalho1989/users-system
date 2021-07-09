import React from "react";
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IUser } from "../types/User";

export interface HeaderData {
  key: string;
  label: string;
}

interface TableProps {
  headerData: HeaderData[];
  bodyData: Array<any>;
  onDeleteClick?: (user: IUser) => void;
}
export const Table: React.FC<TableProps> = ({
  headerData,
  bodyData,
  onDeleteClick,
}) => {
  return (
    <ChakraTable variant="striped" colorScheme="gray" bgColor="white" p="1rem">
      <Thead>
        <Tr>
          {headerData.map((item) => (
            <Th key={item.key}>{item.label}</Th>
          ))}
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {!bodyData.length ? (
          <div> no</div>
        ) : (
          bodyData.map((item) => {
            return (
              <Tr key={item.id}>
                {headerData.map((value, idx) => (
                  <Td key={idx}>{item[value.key]}</Td>
                ))}
                <Td>
                  <IconButton
                    aria-label="Search database"
                    size="sm"
                    variant="outline"
                    colorScheme="purple"
                    borderRadius="md"
                    icon={<EditIcon />}
                    mr="0.5rem"
                  />
                  <IconButton
                    size="sm"
                    aria-label="Search database"
                    colorScheme="purple"
                    borderRadius="md"
                    onClick={() => onDeleteClick && onDeleteClick(item)}
                    icon={<DeleteIcon />}
                  />
                </Td>
              </Tr>
            );
          })
        )}
      </Tbody>
    </ChakraTable>
  );
};

export default Table;
