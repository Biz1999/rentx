import React from 'react';
import { useTheme } from 'styled-components';

import {
  Container,
  Title
} from './styles';

interface Props {
  title: string;
  color?: string;
  onPress: () => void;
}

export function Button({
  title,
  color,
  onPress,
}: Props) {
  const { main } = useTheme().colors;

  return (
    <Container
      onPress={onPress}
      color={color ? color : main}
    >
      <Title>{title}</Title>
    </Container>
  );
}