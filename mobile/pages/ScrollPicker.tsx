import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, NativeScrollEvent, NativeSyntheticEvent,
} from 'react-native';

const items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10',
];

const itemHeight = 30; // Change this value based on your item height

const displayItemNum = 5;

function MyPicker() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView | null>(null);

  function handleScroll(event : NativeSyntheticEvent<NativeScrollEvent>) {
    const { y } = event.nativeEvent.contentOffset;
    const index = Math.round(y / itemHeight);
    setSelectedIndex(index);
  }

  function scrollFix(i: number) {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: i * itemHeight,
        animated: true,
      });
    }
  }

  function handleItemPress(index: number) {
    setSelectedIndex(index);
    scrollFix(index);
  }

  return (
    <View>
      <Text>
        Selected value:
        {items[selectedIndex]}
      </Text>
      <ScrollView
        ref={scrollViewRef}
        style={{ height: itemHeight * displayItemNum }} // Change this value based on your design
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        onScroll={handleScroll}
        onScrollEndDrag={() => scrollFix(selectedIndex)}
      >
        <View style={{ height: itemHeight * ((displayItemNum - 1) / 2) }} />
        {items.map((item, index) => (
          <TouchableOpacity
            key={item}
            style={{
              height: itemHeight,
              justifyContent: 'center',
              backgroundColor: index === selectedIndex ? '#f0f0f0' : '#fff',
            }}
            onPress={() => handleItemPress(index)}
          >
            <Text
              style={{
                textAlign: 'center',
                fontWeight: index === selectedIndex ? 'bold' : 'normal',
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
        <View style={{ height: itemHeight * ((displayItemNum - 1) / 2) }} />
      </ScrollView>
    </View>
  );
}

export default MyPicker;
