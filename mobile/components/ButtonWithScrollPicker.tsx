import React, { useState } from 'react';
import {
  Modal, Pressable, Text, View,
} from 'react-native';
import ScrollPicker from './ScrollPicker';
import MyButton from './MyButton';

type Props = {
  items: number[]
  slt: number
  setSlt: React.Dispatch<React.SetStateAction<number>>
  label: string
}

export default function ButtonWithScrollPicker({
  items, slt, setSlt, label,
} : Props) {
  const [secModalVisible, setSecModalVisible] = useState(false);

  return (
    <View>
      <Text>{label}</Text>
      <Pressable onPress={() => setSecModalVisible(true)}>
        <Text>{slt}</Text>
      </Pressable>
      <Modal
        animationType="slide"
        visible={secModalVisible}
      >
        <ScrollPicker items={items} handleItem={setSlt} selectedItem={slt} />
        <MyButton
          label="close"
          onPress={() => setSecModalVisible(false)}
        />
      </Modal>
    </View>
  );
}
