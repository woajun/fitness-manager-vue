import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text, View,
} from 'react-native';
import tw from 'twrnc';
import MyButton from '../components/MyButton';
import { msToHHMMSS, msToMMSSsss } from '../common/helper/time';
import ButtonWithScrollPicker from '../components/ButtonWithScrollPicker';
import ExcerciseButtonWithScrollPicker from '../components/ExcerciseButtonWithScrollPicker';
import { Excercise, Record } from './Definitions';
import exDatas from '../mock/ExData';
import s from './Styles';

const secs = Array(20).fill(0).map((e, i) => i * 10);
const reps = Array(100).fill(0).map((e, i) => i);

export default function ExcerLayout() {
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [curEx, setCurEx] = useState<Excercise>();
  const [exData, setExData] = useState<Excercise[]>([]);

  const [sec, setSec] = useState(60);
  const [rep, setRep] = useState(0);
  const [kg, setKg] = useState(0);
  const [kgs, setKgs] = useState([0]);

  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    setExData(exDatas);
    setCurEx(exDatas[0]);
  }, []);

  useEffect(() => {
    if (curEx) {
      setKg(curEx.kgStart);
      setRep(curEx.repStart);
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
    setRecords([]);
  }

  function handleRecord() {
    console.log('record');
    if (!curEx) return;
    setRecords([...records, {
      userId: 'hi',
      exrId: curEx.id,
      at: new Date(),
      kg,
      rep,
      ms: currentTime,
    }]);
    setCurrentTime(0);
  }

  function getExName(id: number) {
    const found = exData.find((e) => e.id === id);
    return found ? found.name : '';
  }

  const curExRecords = records.filter((e) => e.exrId === curEx?.id);
  return (
    <View style={[s.f, s.col, s.p20]}>
      <View style={[s.f, s.vc, s.aqua]} />
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
      <View style={[s.f3, s.vc, s.green]}>
        <ScrollView>
          <Text>벤트오버 레터럴레이즈 - 10Set/87rep/10:17min</Text>
          <Text>풀업 - 10Set/87rep/10:17min</Text>
          {
          records.map((record) => (
            <View key={record.at.getTime()}>
              <Text>
                {getExName(record.exrId)}
                {record.kg}
                /
                {record.rep}
                /
                {record.ms / 1000}
              </Text>
            </View>
          ))
          }
        </ScrollView>
      </View>
      <View style={[s.f2, s.row, s.yellow]}>
        <View style={[s.f, s.vc]}>
          <ExcerciseButtonWithScrollPicker
            items={exData}
            label="exercise"
            setSlt={setCurEx}
            slt={curEx}
          />
        </View>
        <View style={[s.f, s.vc]}>
          <Text>(last 10Set/ 100rep)</Text>
          <Text>
            {curExRecords.length}
            Set /
            {curExRecords.reduce((t, e) => t + e.rep, 0)}
            rep
          </Text>
        </View>
      </View>
      <View style={[s.f2, s.row]}>
        <View style={[s.f, s.vc]}>
          <ButtonWithScrollPicker
            items={kgs}
            label="kg"
            setSlt={setKg}
            slt={kg}
          />
        </View>
        <View style={[s.f, s.vc]}>
          <ButtonWithScrollPicker
            items={reps}
            label="rep"
            setSlt={setRep}
            slt={rep}
          />
        </View>
        <View style={[s.f, s.vc]}>
          <ButtonWithScrollPicker
            items={secs}
            label="sec"
            setSlt={setSec}
            slt={sec}
          />
        </View>
      </View>
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
