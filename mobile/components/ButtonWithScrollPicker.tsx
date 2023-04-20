import React, { useState } from 'react';
import {
  Modal, Pressable, Text, View,
} from 'react-native';
import ScrollPicker from './ScrollPicker';
import MyButton from './MyButton';

const secs = [
  '00',
  '10',
  '20',
  '30',
  '40',
  '50',
  '60',
  '70',
  '80',
  '90',
  '100',
  '110',
  '120',
  '130',
  '140',
  '150',
  '160',
  '170',
  '180',
  '190',
];

export default function ButtonWithScrollPicker() {
  const [secModalVisible, setSecModalVisible] = useState(false);
  const [sec, setSec] = useState('40');

  return (
    <View>
      <Text>sec</Text>
      <Pressable onPress={() => setSecModalVisible(true)}>
        <Text>{sec}</Text>
      </Pressable>
      <Modal
        animationType="slide"
        visible={secModalVisible}
      >
        <Text>select seconds</Text>
        <ScrollPicker items={secs} handleItem={setSec} selectedItem={sec} />
        <MyButton
          label="close"
          onPress={() => setSecModalVisible(false)}
        />
      </Modal>
    </View>
  );
}
