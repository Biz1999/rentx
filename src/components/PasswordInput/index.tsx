import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { useTheme } from 'styled-components';

import {
  Container,
  IconContainer,
  InputText,
  ChangePasswordVisibilityButton
} from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
}

export function PasswordInput({
  iconName,
  ...rest
}: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const theme = useTheme();

  const handlePasswordVisibleChange = () => {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <Container>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={theme.colors.text_detail}
        />
      </IconContainer>
      <InputText
        secureTextEntry={isPasswordVisible}
        {...rest}
      />

      <ChangePasswordVisibilityButton
        onPress={handlePasswordVisibleChange}
      >
        <Feather
          name={isPasswordVisible ? 'eye' : 'eye-off'}
          size={24}
          color={theme.colors.text_detail}
        />
      </ChangePasswordVisibilityButton>
    </Container>
  );
}