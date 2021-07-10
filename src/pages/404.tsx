import React from "react";
import { Image, Stack } from "@chakra-ui/react";
import notFoundImg from "../../public/004.jpg";
const NotFound: React.FC = () => {
  return (
    <Stack>
      <Image src="../../public/004.jpg" alt="Not found" />
    </Stack>
  );
};

export default NotFound;
