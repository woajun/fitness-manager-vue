import React from 'react';
import {
  View, Pressable,
} from 'react-native';
import tw from 'twrnc';
import JButton from './components/JButton';

export default function App() {
  return (
    <Pressable
      style={tw`flex-1 items-center justify-center dark:bg-slate-800`}
    >
      <View>
        <JButton />
      </View>
    </Pressable>
  );
}
