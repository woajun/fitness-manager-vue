import React, { useState } from 'react';
import {
  Modal, Pressable, Text, View,
} from 'react-native';
import ScrollPicker from './ScrollPicker';
import MyButton from './MyButton';
import { Excercise } from '../pages/Definitions';

type Props = {
  items: Excercise[]
  slt: Excercise | undefined
  setSlt: React.Dispatch<React.SetStateAction<Excercise| undefined>>
  label: string
}

export default function ButtonWithScrollPicker({
  items, slt, setSlt, label,
} : Props) {
  const [secModalVisible, setSecModalVisible] = useState(false);

  function key(item: Excercise) {
    return String(item.id);
  }
  return (
    <View>
      <Text>{label}</Text>
      <Pressable onPress={() => setSecModalVisible(true)}>
        <Text>{slt?.name}</Text>
      </Pressable>
      <Modal
        animationType="slide"
        visible={secModalVisible}
      >
        <ScrollPicker
          items={items}
          handleItem={setSlt}
          selectedItem={slt}
          setkey={key}
          show={(item: Excercise) => item.name}
        />
        <MyButton
          label="close"
          onPress={() => setSecModalVisible(false)}
        />
      </Modal>
    </View>
  );
}
