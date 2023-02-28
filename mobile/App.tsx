import React from 'react';
import { View, Text, Pressable } from 'react-native';
import tw from 'twrnc';
import { useAppColorScheme } from 'twrnc/dist/esm/hooks';

export default function App() {
  const [colorScheme, toggleColorScheme] = useAppColorScheme(tw);

  return (
    <Pressable
      onPress={toggleColorScheme}
      style={tw`flex-1 items-center justify-center dark:bg-slate-800`}
    >
      <View>
        <Text style={tw`dark:text-white`}>{`Try clicking me! ${colorScheme === 'dark' ? '🌙' : '🌞'}`}</Text>
      </View>
    </Pressable>
  );
}
