import React from 'react';
import {
  View, Text, Pressable,
} from 'react-native';
import tw from 'twrnc';
import { useAppColorScheme } from 'twrnc/dist/esm/hooks';

export default function App() {
  const [colorScheme, toggleColorScheme] = useAppColorScheme(tw);

  return (
    <Pressable
      style={tw`flex-1 items-center justify-center dark:bg-slate-800`}
    >
      <View>
        <Pressable
          style={tw`rounded-lg bg-slate-700`}
          onPress={toggleColorScheme}
        >
          <Text style={tw`text-slate-50 dark:text-white text-2xl p-3 text-center`}>{`Try clicking me! ${colorScheme === 'dark' ? '🌙' : '🌞'}`}</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
