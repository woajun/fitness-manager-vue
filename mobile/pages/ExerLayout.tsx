import React, { useState, useEffect } from 'react';
import {
  Text, Touchable, TouchableOpacity, View,
} from 'react-native';
import tw from 'twrnc';
import MyButton from '../components/MyButton';
import { msToHHMMSS, msToMMSSsss } from '../common/helper/time';
import ButtonWithScrollPicker from '../components/ButtonWithScrollPicker';
import { Condtions, Excercise } from './Definitions';
import exDatas from '../mock/ExData';

const secs = [
  0,
  10,
  20,
  30,
  40,
  50,
  60,
  70,
  80,
  90,
  100,
  110,
  120,
  130,
  140,
  150,
  160,
  170,
  180,
  190,
];

export default function ExcerLayout() {
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [curEx, setCurEx] = useState<Excercise>();
  const [exData, setExData] = useState<Excercise[]>([]);

  const [sec, setSec] = useState(60);
  const [kg, setKg] = useState(0);
  const [kgs, setKgs] = useState([0]);

  useEffect(() => {
    setExData(exDatas);
    setCurEx(exDatas[0]);
  }, []);

  useEffect(() => {
    if (curEx) {
      setKg(curEx.kgStart);
      const aKgs = [];
      for (let i = curEx.kgMin; i <= curEx.kgMax; i += curEx.kgUnit) {
        aKgs.push(i);
      }
      setKgs(aKgs);
    }
  }, [curEx]);

  useEffect(() => {
    let intervalId = 0;
    if (isRunning) {
      intervalId = setInterval(() => {
        setCurrentTime((c) => c + 100);
        setTotalTime((t) => t + 100);
      }, 100);
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
          <Text style={tw`text-2xl`}>{ msToMMSSsss((sec * 1000) - currentTime) }</Text>
          <Text style={tw`text-xl text-gray-500`}>{ msToHHMMSS(totalTime) }</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: 'blue' }}>
          <Text>{ }</Text>
        </View>
      </View>
      <View style={{ flex: 3, justifyContent: 'center', backgroundColor: 'green' }} />
      <View style={{ flex: 2, justifyContent: 'center', backgroundColor: 'yellow' }}>
        <Text>{curEx?.name}</Text>
      </View>
      <View style={{ flex: 2, flexDirection: 'row' }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ButtonWithScrollPicker
            items={kgs}
            label="kg"
            setSlt={setKg}
            slt={kg}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ButtonWithScrollPicker
            items={secs}
            label="sec"
            setSlt={setSec}
            slt={sec}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ButtonWithScrollPicker
            items={secs}
            label="sec"
            setSlt={setSec}
            slt={sec}
          />
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
