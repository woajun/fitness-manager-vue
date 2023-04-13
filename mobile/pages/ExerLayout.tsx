import React, { useState, useRef } from 'react';
import { Text, View } from 'react-native';
import MyButton from '../components/MyButton';
import Timer from './timer/Timer';

class Stopwatch {
  setTime: React.Dispatch<React.SetStateAction<number>>;
  #startTime = 0;
  #intervalID = 0;
  #keepTime = 0;

  constructor(setTime: any) {
    this.setTime = setTime;
  }

  getTime() {
    return this.#keepTime + (Date.now() - this.#startTime);
  }

  run() {
    this.#startTime = Date.now();

    clearInterval(this.#intervalID);
    this.#intervalID = setInterval(() => {
      this.setTime(this.getTime());
    }, 10)
  }

  pause() {
    this.#keepTime = this.getTime();
    clearInterval(this.#intervalID);
  }

  reset() {
    const result = this.getTime();
    clearInterval(this.#intervalID);
    this.#startTime = Date.now();
    this.#intervalID = 0;
    this.#keepTime = 0;
    this.setTime(this.getTime());
    return result;
  }
}

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

  const totalTime = ((record.current.reduce((t, c) => t + c, 0) + time) / 1000).toFixed(3)

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
      <View style={{ flex: 2, justifyContent: 'center', backgroundColor: 'aqua' }} />
      <View style={{ flex: 2, justifyContent: 'center', backgroundColor: 'white' }}>
        {isRun ?
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
          :
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
        }
      </View>
    </View>
  );
}
