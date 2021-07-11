import React, { ReactElement, FC } from "react";
import {
  Button,
  ButtonGroup,
  useRadio,
  useRadioGroup,
  UseRadioProps,
} from "@chakra-ui/react";
import { HiViewGrid, HiMenuAlt2 } from "react-icons/hi";
import { IconType } from "react-icons";

export type ViewsType = "card" | "grid";

interface RadioCardProps extends UseRadioProps {
  label: string;
  icon: ReactElement<IconType>;
}

const RadioCard: FC<RadioCardProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <>
      <Button
        size="md"
        leftIcon={props.icon}
        as="label"
        {...checkbox}
        _checked={{
          bg: "purple.500",
          color: "white",
        }}
      >
        {props.label}
        <input {...input} />
      </Button>
    </>
  );
};

export interface SwitchViewButtonsProps {
  value: ViewsType;
  onChange: (value: ViewsType) => void;
}

export const SwitchViewButtons: FC<SwitchViewButtonsProps> = ({
  value,
  onChange,
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "transformControlsMode",
    value,
    onChange,
  });

  const group = getRootProps();

  return (
    <ButtonGroup
      {...group}
      isAttached
      display={["none", "none", "flex", "flex"]}
    >
      <RadioCard
        {...getRadioProps({ value: "grid" })}
        label="Grid"
        icon={<HiMenuAlt2 />}
      />

      <RadioCard
        {...getRadioProps({ value: "card" })}
        label="Card"
        icon={<HiViewGrid />}
      />
    </ButtonGroup>
  );
};

export default SwitchViewButtons;
