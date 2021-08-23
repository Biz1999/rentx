import React, { useState } from "react";
import { Keyboard, TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import {
  Container,
  IconContainer,
  InputText,
  ChangePasswordVisibilityButton,
  Line,
} from "./styles";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const theme = useTheme();

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handlePasswordVisibleChange = () => {
    setIsPasswordVisible(!isPasswordVisible);
    Keyboard.dismiss();
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
          secureTextEntry={isPasswordVisible}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...rest}
        />

        <ChangePasswordVisibilityButton onPress={handlePasswordVisibleChange}>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
          />
        </ChangePasswordVisibilityButton>
      </Container>
      <Line isFocused={isFocused} />
    </>
  );
}
