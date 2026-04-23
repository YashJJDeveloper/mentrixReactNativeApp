import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles/buttonStyles';

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

function Button({ title, onPress, disabled }: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
