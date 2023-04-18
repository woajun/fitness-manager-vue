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
  'Item 11',
  'Item 12',
  'Item 13',
  'Item 14',
  'Item 15',
  'Item 16',
  'Item 17',
  'Item 18',
  'Item 19',
  'Item 20',
  'Item 21',
  'Item 22',
  'Item 23',
  'Item 24',
  'Item 25',
  'Item 26',
  'Item 27',
  'Item 28',
  'Item 29',
];

const itemHeight = 30; // Change this value based on your item height

const displayItemNum = 10;

function MyPicker() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const isPress = useRef(false);

  function scrollFix(i: number) {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: i * itemHeight,
        animated: true,
      });
    }
  }

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (isPress.current) return;
    const { y } = event.nativeEvent.contentOffset;
    const index = Math.round(y / itemHeight);
    setSelectedIndex(index);
  }

  function handleItemPress(index: number) {
    isPress.current = true;
    setSelectedIndex(index);
    scrollFix(index);
  }

  function onScrollEndDrag(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const { y } = event.nativeEvent.contentOffset;
    const index = Math.round(y / itemHeight);
    scrollFix(index);
  }

  function onScrollBeginDrag() { // android
    isPress.current = false;
  }

  function onTouchStart() { // web, android
    console.log('onTouchStart');
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
        onScroll={handleScroll}
        onScrollEndDrag={onScrollEndDrag}
        onScrollBeginDrag={onScrollBeginDrag}
        onTouchStart={onTouchStart}
      >
        <View style={{ height: itemHeight * ((displayItemNum - 1) / 2) }} />
        {items.map((item, index) => (
          <TouchableOpacity
            key={item}
            style={{
              height: itemHeight,
              justifyContent: 'center',
            }}
            onPress={() => handleItemPress(index)}
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
          </TouchableOpacity>
        ))}
        <View style={{ height: itemHeight * ((displayItemNum - 1) / 2) }} />
      </ScrollView>
    </View>
  );
}

export default MyPicker;
