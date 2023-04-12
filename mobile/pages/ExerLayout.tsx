import React from 'react';
import { View } from 'react-native';

export default function ExcerLayout() {
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <View style={{ flex: 1, backgroundColor: 'aqua' }} />
      <View style={{ flex: 2, flexDirection: 'row' }}>
        <View style={{ flex: 1, backgroundColor: 'red' }} />
        <View style={{ flex: 1, backgroundColor: 'blue' }} />
      </View>
      <View style={{ flex: 3, backgroundColor: 'green' }} />
      <View style={{ flex: 2, backgroundColor: 'yellow' }} />
      <View style={{ flex: 2, backgroundColor: 'aqua' }} />
      <View style={{ flex: 2, backgroundColor: 'white' }} />
    </View>
  );
}
