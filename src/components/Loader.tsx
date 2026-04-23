import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default Loader;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});
