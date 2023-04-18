import React, { useState, useEffect } from 'react';
import {
  Modal, Pressable, Text, View,
} from 'react-native';
import tw from 'twrnc';
import MyButton from '../components/MyButton';
import ScrollPicker from './ScrollPicker';

const secs = [
  '00',
  '10',
  '20',
  '30',
  '40',
  '50',
  '60',
  '70',
  '80',
  '90',
  '100',
  '110',
  '120',
  '130',
  '140',
  '150',
  '160',
  '170',
  '180',
  '190',
];

export function to00(r: number) {
  return r < 10 ? `0${r}` : `${r}`;
}

function msTo(ms: number) {
  const rawH = ms / 1000 / 60 / 60;
  const h = Math.floor(rawH);
  const m = Math.floor((rawH - h) * 60);
  const s = Math.floor(((rawH - h) * 60 - m) * 60);
  const sss = Math.floor((ms % 1000) / 10);
  return {
    h, m, s, sss,
  };
}
function msToHHMMSS(ms: number) {
  const { h, m, s } = msTo(ms);
  return `${to00(h)}:${to00(m)}:${to00(s)}`;
}

function msToMMSSsss(ms:number) {
  const { m, s, sss } = msTo(ms);
  return `${to00(m)}:${to00(s)}.${to00(sss)}`;
}

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
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    setCurrentTime(0);
    setTotalTime(0);
  }

  function handleRecord() {
    setCurrentTime(0);
  }

  const [secModalVisible, setSecModalVisible] = useState(false);

  const [sec, setSec] = useState('40');

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
          <Text>kg</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>rep</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>sec</Text>
          <Pressable onPress={() => setSecModalVisible(true)}>
            <Text>{sec}</Text>
          </Pressable>
        </View>
      </View>
      <View style={{ flex: 2, justifyContent: 'center', backgroundColor: 'white' }}>
        {isRunning
          ? (
            <View style={{ flexDirection: 'row' }}>
              <MyButton
                style={{ flex: 1, marginRight: 1 }}
                label="record"
                onPress={() => handleRecord()}
              />
              <MyButton
                style={{ flex: 1, marginLeft: 1 }}
                label="pause"
                onPress={() => handlePause()}
              />
            </View>
          )
          : (
            <View style={{ flexDirection: 'row' }}>
              <MyButton
                style={{ flex: 1, marginRight: 1 }}
                label="run"
                onPress={() => handleRun()}
              />
              <MyButton
                style={{ flex: 1, marginLeft: 1 }}
                label="finish"
                onPress={() => handleReset()}
              />
            </View>
          )}
      </View>
      <Modal
        animationType="slide"
        visible={secModalVisible}
      >
        <Text>select seconds</Text>
        <ScrollPicker items={secs} handleItem={setSec} selectedItem={sec} />
        <MyButton
          label="close"
          onPress={() => setSecModalVisible(false)}
        />
      </Modal>
    </View>
  );
}
