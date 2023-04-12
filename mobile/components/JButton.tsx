import React from 'react';
import { Pressable, Text } from 'react-native';
import tw from 'twrnc';
import { useAppColorScheme } from 'twrnc/dist/esm/hooks';

export default function JButton() {
  const [colorScheme, toggleColorScheme] = useAppColorScheme(tw);

  return (
    <Pressable
      style={tw`rounded-lg bg-slate-700`}
      onPress={toggleColorScheme}
    >
      <Text
        style={tw`text-slate-50 dark:bg-red-800 text-2xl p-3 text-center`}
      >
        {`Try clicking me! ${colorScheme === 'dark' ? '🌙' : '🌞'}`}
      </Text>
    </Pressable>
  );
}
