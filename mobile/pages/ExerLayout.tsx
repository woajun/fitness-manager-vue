import React, { useState, useRef } from 'react';
import { Text, View } from 'react-native';
import MyButton from '../components/MyButton';
import Timer from './timer/Timer';

export default function ExcerLayout() {
  const [startTime, setStartTime] = useState(0);
  const [now, setNow] = useState(0);
  const [keepTime, setKeepTime] = useState(0);
  const intervalRef = useRef(0);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }
  function handleStop() {
    setKeepTime(keepTime + ((now - startTime) / 1000));
    setStartTime(0);
    setNow(0);
    clearInterval(intervalRef.current);
  }

  function handleReset() {
    setKeepTime(0);
    setStartTime(0);
    setNow(0);
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = keepTime + ((now - startTime) / 1000);
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', padding: 20 }}>
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'aqua' }} />
      <View style={{ flex: 2, justifyContent: 'center', flexDirection: 'row' }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {keepTime}
          <Timer currentTime={secondsPassed.toFixed(3)} />
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
          flexDirection: 'column',
        }}
        >
          <View style={{ flexDirection: 'row' }}>
            <MyButton
              style={{ flex: 1, marginRight: 1 }}
              label="run
              "
              onPress={() => handleStart()}
            />
            <MyButton
              style={{ flex: 1, marginLeft: 1 }}
              label="finish"
              onPress={() => handleReset()}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <MyButton
              style={{ flex: 1, marginRight: 1 }}
              label="record"
              onPress={() => handleStart()}
            />
            <MyButton
              style={{ flex: 1, marginLeft: 1 }}
              label="pause"
              onPress={() => handleStop()}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
