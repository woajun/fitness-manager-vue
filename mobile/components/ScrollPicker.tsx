/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, Pressable,
} from 'react-native';

const itemHeight = 30; // Change this value based on your item height

const displayItemNum = 20;

type ScrollPickerProps ={
  items: number[]
  handleItem: React.Dispatch<React.SetStateAction<number>>
  selectedItem: number
}

function ScrollPicker({ items, handleItem, selectedItem }: ScrollPickerProps) {
  const [selectedIndex, setSelectedIndex] = useState(items.indexOf(selectedItem));
  const scrollViewRef = useRef<ScrollView | null>(null);

  function scrollFix(i: number) {
    scrollViewRef.current?.scrollTo({
      y: i * itemHeight,
      animated: true,
    });
  }

  useEffect(() => {
    scrollFix(items.indexOf(selectedItem));
  }, [items, selectedItem]);

  function setItem(index: number) {
    setSelectedIndex(index);
    handleItem(items[index]);
  }

  function onItemPress(index: number) {
    setItem(index);
    scrollFix(index);
  }

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        style={{ height: itemHeight * displayItemNum }} // Change this value based on your design
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        scrollEventThrottle={16}
      >
        <View style={{ height: itemHeight * ((displayItemNum - 1) / 2) }} />
        {items.map((item, index) => (
          <Pressable
            key={item}
            style={{
              height: itemHeight,
              justifyContent: 'center',
            }}
            onPress={() => onItemPress(index)}
          >
            <Text
              style={{
                textAlign: 'center',
                fontWeight: index === selectedIndex ? 'bold' : 'normal',
                opacity: index === selectedIndex ? 1 : 0.5,
              }}
            >
              {item}
            </Text>
          </Pressable>
        ))}
        <View style={{ height: itemHeight * ((displayItemNum - 1) / 2) }} />
      </ScrollView>
    </View>
  );
}

export default ScrollPicker;
