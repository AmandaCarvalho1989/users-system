import { InputProps, Image } from "@chakra-ui/react";
import { HiCamera } from "react-icons/hi";
import styled from "styled-components";
export const AvatarInput = styled.div`
  width: 192px;
  height: 192px;
  margin-bottom: 32px;
  position: relative;
  align-self: center;
  border-radius: 8px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
  }
  label {
    position: absolute;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    background-color: #b185db;
    right: 0;
    bottom: 0;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
      width: 20px;
      height: 20px;
      color: #fafafa;
    }
    &:hover {
      background: #b185db;
    }

    input {
      display: none;
    }
  }
`;

interface FileUpload extends InputProps {
  src: any;
  alt: string;
}

export const FileUpload: React.FC<InputProps> = ({ src, alt, onChange }) => {
  return (
    <AvatarInput>
      <Image src={src} alt={alt} />
      <label htmlFor="avatar">
        <input type="file" id="avatar" onChange={onChange} />
        <HiCamera />
      </label>
    </AvatarInput>
  );
};
