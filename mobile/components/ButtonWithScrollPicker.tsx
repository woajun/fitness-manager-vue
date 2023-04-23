import React, { useState } from 'react';
import {
  Modal, Pressable, Text, View,
} from 'react-native';
import ScrollPicker from './ScrollPicker';
import MyButton from './MyButton';
import { Excercise } from '../pages/Definitions';

type NumberProps = {
  items: number[]
  slt: number
  setSlt: React.Dispatch<React.SetStateAction<number>>
  label: string
}

type ExcerciseProps = {
  items: Excercise[]
  slt: Excercise | undefined
  setSlt: React.Dispatch<React.SetStateAction<Excercise | undefined>>
  label: string
}

export default function ButtonWithScrollPicker({
  items, slt, setSlt, label,
} : NumberProps | ExcerciseProps) {
  const [secModalVisible, setSecModalVisible] = useState(false);

  const computedItems = items.map((item) => (typeof item === 'number' ? `${item}` : item.name));

  const handleItem = (sltItem: string) => {
    if (typeof slt === 'number') {
      setSlt(Number(sltItem) as any);
    } else {
      const sltEx = (items as Excercise[]).find((e) => e.name === sltItem);
      setSlt(sltEx as any);
    }
  };

  const computedSlt = `${typeof slt === 'number' ? slt : slt?.name}`;

  return (
    <View>
      <Text>{label}</Text>
      <Pressable onPress={() => setSecModalVisible(true)}>
        <Text>{computedSlt}</Text>
      </Pressable>
      <Modal
        animationType="slide"
        visible={secModalVisible}
      >
        <ScrollPicker items={computedItems} handleItem={handleItem} selectedItem={computedSlt} />
        <MyButton
          label="close"
          onPress={() => setSecModalVisible(false)}
        />
      </Modal>
    </View>
  );
}
