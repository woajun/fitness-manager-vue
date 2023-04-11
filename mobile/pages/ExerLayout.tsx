import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default function ExcerLayout() {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'row',
        },
      ]}
    >
      <View style={{ flex: 1, backgroundColor: 'red' }} />
      <View style={{ flex: 1, backgroundColor: 'blue' }} />
    </View>
  );
}
