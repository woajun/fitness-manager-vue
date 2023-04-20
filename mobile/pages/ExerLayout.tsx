import React, { useState, useEffect } from 'react';
import {
  Text, View,
} from 'react-native';
import tw from 'twrnc';
import MyButton from '../components/MyButton';
import { msToHHMMSS, msToMMSSsss } from '../common/helper/time';
import ButtonWithScrollPicker from '../components/ButtonWithScrollPicker';

export default function ExcerLayout() {
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId = 0;
    if (isRunning) {
      intervalId = setInterval(() => {
        setCurrentTime((c) => c + 10);
        setTotalTime((t) => t + 10);
      }, 10);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  function handleRun() {
    setIsRunning(true);
  }

  function handlePause() {
    console.log('pause');
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    setCurrentTime(0);
    setTotalTime(0);
  }

  function handleRecord() {
    console.log('record');
    setCurrentTime(0);
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', padding: 20 }}>
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'aqua' }} />
      <View style={{ flex: 2, justifyContent: 'center', flexDirection: 'row' }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={tw`text-2xl`}>시작</Text>
          <Text style={tw`text-2xl`}>{ msToMMSSsss(currentTime) }</Text>
          <Text style={tw`text-xl text-gray-500`}>{ msToHHMMSS(totalTime) }</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: 'blue' }}>
          <Text>{ }</Text>
        </View>
      </View>
      <View style={{ flex: 3, justifyContent: 'center', backgroundColor: 'green' }} />
      <View style={{ flex: 2, justifyContent: 'center', backgroundColor: 'yellow' }} />
      <View style={{ flex: 2, flexDirection: 'row' }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ButtonWithScrollPicker />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ButtonWithScrollPicker />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ButtonWithScrollPicker />
        </View>
      </View>
      <View style={{ flex: 2, justifyContent: 'center', backgroundColor: 'white' }}>
        {isRunning
          ? (
            <View style={{ flexDirection: 'row' }}>
              <MyButton
                style={{ flex: 1, marginRight: 1 }}
                label="record"
                onPress={handleRecord}
              />
              <MyButton
                style={{ flex: 1, marginLeft: 1 }}
                label="pause"
                onPress={handlePause}
              />
            </View>
          )
          : (
            <View style={{ flexDirection: 'row' }}>
              <MyButton
                style={{ flex: 1, marginRight: 1 }}
                label="run"
                onPress={handleRun}
              />
              <MyButton
                style={{ flex: 1, marginLeft: 1 }}
                label="finish"
                onPress={handleReset}
              />
            </View>
          )}
      </View>
    </View>
  );
}
