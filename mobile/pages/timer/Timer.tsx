import React from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';

function Timer() {
  return (
    <View style={tw`justify-between`}>
      <View style={tw`flex flex-start`}>
        <Text style={tw`text-4xl`}>시작</Text>
        <Text style={tw`text-4xl`}>10:00:00</Text>
        <Text style={tw`text-2xl text-gray-500`}>00:10:00</Text>
      </View>
      <View style={tw`flex flex-end`}>
        <Text>얘는 오른쪽</Text>
      </View>
    </View>
  );
}
export default Timer;
