import React, { useEffect, useState } from 'react';
import {
  Text, View,
} from 'react-native';
import Timer from './timer/Timer';
import ButtonWithScrollPicker from '../../components/ButtonWithScrollPicker';
import ExcerciseButtonWithScrollPicker from '../../components/ExcerciseButtonWithScrollPicker';
import s from '../Styles';
import ShowRecords from './timer/ShowRecords';
import { Excercise, Record } from '../Definitions';
import exDatas from '../../mock/ExData';

const secs = Array(20).fill(0).map((e, i) => i * 10);
const reps = Array(100).fill(0).map((e, i) => i);

export default function ModalAndTimer() {
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

  const curExRecords = records.filter((e) => e.exrId === curEx?.id);
  return (
    <Timer
      setRecords={setRecords}
      records={records}
      curEx={curEx}
      kg={kg}
      rep={rep}
      sec={sec}
    >
      <View style={[s.f3, s.vc]}>
        <ShowRecords records={records} />
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
    </Timer>
  );
}
