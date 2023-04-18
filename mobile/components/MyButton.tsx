import React from 'react';
import {
  Pressable, PressableProps, StyleProp, Text, ViewStyle,
} from 'react-native';
import tw from 'twrnc';

type MyButtonProps = {
    style?: StyleProp<ViewStyle>;
    label: string;
    onPress: PressableProps['onPress'];
}

export default function MyButton({ style, label, onPress }: MyButtonProps) {
  return (
    <Pressable
      style={[style, tw`rounded-lg bg-slate-700`]}
      onPress={onPress}
    >
      <Text style={tw`text-slate-50 text-2xl p-3 text-center`}>
        {label}
      </Text>
    </Pressable>
  );
}

MyButton.defaultProps = {
  style: {},
};
