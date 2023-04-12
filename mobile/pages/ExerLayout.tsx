import React, { useState } from 'react';
import {
  Alert, Text, View,
} from 'react-native';
import MyButton from '../components/MyButton';

export default function ExcerLayout() {
  const [startTime, setStartTime] = useState(0);
  const [now, setNow] = useState(0);

  function handleStart() {
    // Start counting.
    setStartTime(Date.now());
    setNow(Date.now());

    setInterval(() => {
      // Update the current time every 10ms.
      setNow(Date.now());
    }, 10);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', padding: 20 }}>
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'aqua' }} />
      <View style={{ flex: 2, justifyContent: 'center', flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text>{secondsPassed.toFixed(3)}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: 'blue' }}>
          <Text>{ }</Text>
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
            onPress={() => handleStart()}
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
