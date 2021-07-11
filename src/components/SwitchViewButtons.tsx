import React from "react";
import {
  Radio,
  RadioGroup,
  useRadio,
  Box,
  UseRadioProps,
  HStack,
  useRadioGroup,
  RadioProps,
} from "@chakra-ui/react";

const SwitchViewButtons: React.FC<UseRadioProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "viwe",
    defaultValue: "grid",
    onChange: console.log,
  });

  const group = getRootProps();

  const options = ["card", "grid"];

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
};

function RadioCard(props: RadioProps) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        h='48px'
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        p={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default SwitchViewButtons;
