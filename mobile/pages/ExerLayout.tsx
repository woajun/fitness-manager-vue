import React, { useState, useRef } from 'react';
import {
  Modal, Pressable, Text, View,
} from 'react-native';
import MyButton from '../components/MyButton';
import Timer from './timer/Timer';
import Stopwatch from './stopwatch';
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

export default function ExcerLayout() {
  const [time, setTime] = useState(0);
  const [isRun, setIsRun] = useState(false);

  const sw = useRef(new Stopwatch(setTime));
  const record = useRef<any[]>([]);

  function handleRun() {
    sw.current.run();
    setIsRun(true);
  }

  function handlePause() {
    sw.current.pause();
    setIsRun(false);
  }

  function handleReset() {
    record.current = [];
    sw.current.reset();
  }

  function handleRecord() {
    const ms = sw.current.reset();
    record.current.push(ms);
    sw.current.run();
    console.log(record.current);
  }

  const totalTime = ((record.current.reduce((t, c) => t + c, 0) + time) / 1000).toFixed(3);

  const [secModalVisible, setSecModalVisible] = useState(false);

  const [sec, setSec] = useState('40');

  return (
    <View style={{ flex: 1, flexDirection: 'column', padding: 20 }}>
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'aqua' }} />
      <View style={{ flex: 2, justifyContent: 'center', flexDirection: 'row' }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Timer
            currentTime={(time / 1000).toFixed(3)}
            totalTime={totalTime}
          />
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
          <Pressable onPress={() => setSecModalVisible(true)}>
            <Text>{sec}</Text>
          </Pressable>
        </View>
      </View>
      <View style={{ flex: 2, justifyContent: 'center', backgroundColor: 'white' }}>
        {isRun
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
    </View>
  );
}
