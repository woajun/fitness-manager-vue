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

const itemHeight = 50; // Change this value based on your item height

function MyPicker() {
  const [selectedValue, setSelectedValue] = useState(items[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const handleScroll = (event : NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y } = event.nativeEvent.contentOffset;
    const index = Math.round(y / itemHeight);
    setSelectedValue(items[index]);
    setSelectedIndex(index);
  };

  const handleItemPress = (index: number) => {
    setSelectedValue(items[index]);
    setSelectedIndex(index);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: index * itemHeight,
        animated: true,
      });
    }
  };

  return (
    <View>
      <Text>Select an item:</Text>
      <ScrollView
        ref={scrollViewRef}
        style={{ height: itemHeight * 5 }} // Change this value based on your design
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        onScroll={handleScroll}
      >
        <View style={{ height: itemHeight * 2 }} />
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
        <View style={{ height: itemHeight * 2 }} />
      </ScrollView>
      <Text>
        Selected value:
        {selectedValue}
      </Text>
    </View>
  );
}

export default MyPicker;
