import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const LogoutButton = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#ff4d4f',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
  },
});
