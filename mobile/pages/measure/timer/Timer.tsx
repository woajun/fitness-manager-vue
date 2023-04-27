import React, { useState, useEffect, ReactNode } from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';
import MyButton from '../../../components/MyButton';
import { msToHHMMSS, msToMMSSsss } from '../../../common/helper/time';
import s from '../../Styles';
import { Excercise, Record } from '../../Definitions';

type Props = {
  children: ReactNode;
  records: Record[];
  setRecords: React.Dispatch<React.SetStateAction<Record[]>>;
  curEx: Excercise | undefined;
  kg: number,
  rep: number,
  sec: number,
}

export default function ExcerLayout({
  children,
  setRecords,
  records,
  curEx,
  kg,
  rep,
  sec,

} : Props) {
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId = 0;
    const timeUnit = 100;
    if (isRunning) {
      intervalId = setInterval(() => {
        setCurrentTime((c) => c + timeUnit);
        setTotalTime((t) => t + timeUnit);
      }, timeUnit);
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
    setRecords([]);
  }

  function handleRecord() {
    console.log('record');
    if (!curEx) return;
    setRecords([...records, {
      userId: 'hi',
      exrId: curEx.id,
      exrName: curEx.name,
      at: new Date(),
      kg,
      rep,
      ms: currentTime,
    }]);
    setCurrentTime(0);
  }

  return (
    <View style={[s.f, s.col, s.p20]}>
      <View style={[s.f2, s.vc, s.row]}>
        <View style={[s.f, s.vc]}>
          <Text style={tw`text-2xl`}>Start</Text>
          <Text style={tw`text-2xl`}>{ msToMMSSsss((sec * 1000) - currentTime) }</Text>
          <Text style={tw`text-xl text-gray-500`}>{ msToHHMMSS(totalTime) }</Text>
        </View>
        <View style={[s.f, s.blue]}>
          <Text>{ }</Text>
        </View>
      </View>
      { children }
      <View style={[s.f2, s.vc]}>
        {isRunning
          ? (
            <View style={[s.row]}>
              <MyButton
                style={[s.f, s.mr]}
                label="record"
                onPress={handleRecord}
              />
              <MyButton
                style={[s.f, s.ml]}
                label="pause"
                onPress={handlePause}
              />
            </View>
          )
          : (
            <View style={[s.row]}>
              <MyButton
                style={[s.f, s.mr]}
                label="run"
                onPress={handleRun}
              />
              <MyButton
                style={[s.f, s.ml]}
                label="finish"
                onPress={handleReset}
              />
            </View>
          )}
      </View>
    </View>
  );
}
