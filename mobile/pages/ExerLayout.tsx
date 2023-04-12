import React from 'react';
import {
  Alert, View,
} from 'react-native';
import MyButton from '../components/MyButton';

export default function ExcerLayout() {
  return (
    <View style={{ flex: 1, flexDirection: 'column', padding: 20 }}>
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'aqua' }} />
      <View style={{ flex: 2, justifyContent: 'center', flexDirection: 'row' }}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1, backgroundColor: 'blue' }} />
      </View>
      <View style={{ flex: 3, justifyContent: 'center', backgroundColor: 'green' }} />
      <View style={{ flex: 2, justifyContent: 'center', backgroundColor: 'yellow' }} />
      <View style={{ flex: 2, justifyContent: 'center', backgroundColor: 'aqua' }} />
      <View style={{ flex: 2, justifyContent: 'center', backgroundColor: 'white' }}>
        <View style={{
          flexDirection: 'row',
        }}
        >
          <MyButton
            style={{ flex: 1, marginRight: 1 }}
            label="start"
            onPress={() => Alert.alert('Start button pressed')}
          />
          <MyButton
            style={{ flex: 1, marginLeft: 1 }}
            label="end"
            onPress={() => Alert.alert('End button pressed')}
          />
        </View>
      </View>
    </View>
  );
}
