import React from 'react';
import {
  Alert, Text, View,
} from 'react-native';
import MyButton from '../components/MyButton';
import StopWatch from './stopWatch';

export default function ExcerLayout() {
  let presentTimeText = 0;
  let isRun = false;
  const timer = new StopWatch(
    (ms) => {
      console.log(ms);
      presentTimeText = ms;
    },
    (bool) => { isRun = bool; },
  );

  return (
    <View style={{ flex: 1, flexDirection: 'column', padding: 20 }}>
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'aqua' }} />
      <View style={{ flex: 2, justifyContent: 'center', flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text>{presentTimeText}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: 'blue' }}>
          <Text>{ isRun }</Text>
        </View>
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
            onPress={() => timer.start()}
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
