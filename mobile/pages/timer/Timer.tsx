import React from 'react';
import {
  Text, View,
} from 'react-native';
import tw from 'twrnc';

type TimerProps = {
  currentTime: string
}

function Timer({ currentTime }: TimerProps) {
  return (
    <View style={tw`justify-between`}>
      <View style={tw`flex flex-start`}>
        <Text style={tw`text-4xl`}>시작</Text>
        <Text style={tw`text-4xl`}>{ currentTime }</Text>
        <Text style={tw`text-2xl text-gray-500`}>{ currentTime }</Text>
      </View>
    </View>
  );
}
export default Timer;
