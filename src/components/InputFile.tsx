import { InputProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HiCamera } from "react-icons/hi";
import Image from "next/image";
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
    right: -6px;
    bottom: -6px;
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

interface FileUpload extends Omit<InputProps, "onChange"> {
  src: any;
  alt?: string;
  onChange: (image: string) => void;
}

export const FileUpload: React.FC<FileUpload> = ({
  src,
  alt,
  isReadOnly,
  onChange,
}) => {
  const [image, setImage] = useState(src);

  useEffect(() => {
    setImage(src);
    return () => {};
  }, [src]);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => onChange(e.target ? String(e.target.result) : "");
  };

  return (
    <AvatarInput>
      <Image
        src={image || "/images/placeholder.png"}
        alt={alt}
        width="200px"
        height="200px"
      />

      {!isReadOnly && (
        <label htmlFor="picture">
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />
          <HiCamera />
        </label>
      )}
    </AvatarInput>
  );
};
