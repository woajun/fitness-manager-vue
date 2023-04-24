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
  label: number
}

export default function ButtonWithScrollPicker({
  items, slt, setSlt, label,
} : Props) {
  const [secModalVisible, setSecModalVisible] = useState(false);

  function key(item: string) {
    return item;
  }
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
        <ScrollPicker
          items={items}
          handleItem={setSlt}
          selectedItem={slt}
          setkey={key}
          show={(item) => item}
        />
        <MyButton
          label="close"
          onPress={() => setSecModalVisible(false)}
        />
      </Modal>
    </View>
  );
}
