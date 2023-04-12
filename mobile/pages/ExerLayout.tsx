import React from 'react';
import {
  Alert, Button, Pressable, Text, View,
} from 'react-native';
import tw from 'twrnc';
import MyButton from '../components/MyButton';

export default function ExcerLayout() {
  return (
    <View style={{ flex: 1, flexDirection: 'column', padding: 20 }}>
      <View style={{ flex: 1, backgroundColor: 'aqua' }} />
      <View style={{ flex: 2, flexDirection: 'row' }}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1, backgroundColor: 'blue' }} />
      </View>
      <View style={{ flex: 3, backgroundColor: 'green' }} />
      <View style={{ flex: 2, backgroundColor: 'yellow' }} />
      <View style={{ flex: 2, backgroundColor: 'aqua' }} />
      <View style={{ flex: 2, backgroundColor: 'white' }}>
        <View style={{
          flexDirection: 'row',
        }}
        >
          <MyButton
            style={{ flex: 1, paddingRight: 1 }}
            label="start"
            onPress={() => Alert.alert('Start button pressed')}
          />
          <MyButton
            style={{ flex: 1, paddingLeft: 1 }}
            label="end"
            onPress={() => Alert.alert('End button pressed')}
          />
        </View>
      </View>
    </View>
  );
}
