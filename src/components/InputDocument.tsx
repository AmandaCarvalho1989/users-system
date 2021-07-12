import { InputProps } from "@chakra-ui/react";
import React from "react";
//@ts-ignore
import TextInputMask from "react-masked-text";
import styled from "styled-components";

const StyledMaskedInput = styled(TextInputMask)`
  width: 100%;
  min-width: 0px;
  outline: 2px solid transparent;
  outline-offset: 2px;
  position: relative;
  appearance: none;
  padding-inline: 16px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid;
  border-color: inherit;
  background: inherit;
`;

interface InputDocumentProps {
  value: string;
  onChange: (e: string) => void;
}

export const InputDocument: React.FC<InputDocumentProps> = ({
  value,
  onChange,
}) => {
  return (
    <StyledMaskedInput
      value={value}
      kind={"cpf"}
      onChangeText={(e: string) => onChange && onChange(e)}
    />
  );
};

export default InputDocument;
