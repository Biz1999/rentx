import React from 'react';
import { ActivityIndicator } from 'react-native';
import theme from '../../styles/theme';

interface Props {
  color?: string;
}

export function Load({ color = theme.colors.main }: Props) {
  return (
    <ActivityIndicator
      color={color}
      size="large"
      style={{ flex: 1 }}
    />
  );
}