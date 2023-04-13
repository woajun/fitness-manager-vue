import React from 'react';
import {
  Text, View,
} from 'react-native';
import tw from 'twrnc';

type TimerProps = {
  currentTime: string
  totalTime: string
}

function Timer({ currentTime, totalTime }: TimerProps) {
  return (
    <View>
      <Text style={tw`text-2xl`}>시작</Text>
      <Text style={tw`text-2xl`}>{ currentTime }</Text>
      <Text style={tw`text-xl text-gray-500`}>{ totalTime }</Text>
    </View>

  );
}
export default Timer;
