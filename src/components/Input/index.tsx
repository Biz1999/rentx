import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { Container, IconContainer, InputText, Line } from "./styles";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function Input({ iconName, value, ...rest }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const theme = useTheme();

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  return (
    <>
      <Container>
        <IconContainer>
          <Feather
            name={iconName}
            size={24}
            color={
              isFocused || value ? theme.colors.main : theme.colors.text_detail
            }
          />
        </IconContainer>
        <InputText
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...rest}
          value={value}
        />
      </Container>
      <Line isFocused={isFocused} />
    </>
  );
}
