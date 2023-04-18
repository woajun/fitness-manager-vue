import React, { useRef, useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, NativeSyntheticEvent, NativeScrollEvent, LayoutChangeEvent,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    width: '100%',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const items = Array.from({ length: 30 }, (v, i) => `Item ${i + 1}`);
const itemHeight = 50; // Change this value based on your item height
const paddingTop = itemHeight * 2; // Extra padding at the top
const paddingBottom = itemHeight * 2; // Extra padding at the bottom

function MyPicker() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedItem, setSelectedItem] = useState('');
  const [scrollOffset, setScrollOffset] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y } = event.nativeEvent.contentOffset;
    setScrollOffset(y);
    const index = Math.round(y / itemHeight);
    setSelectedItem(items[index]);
  };

  const handleScrollEnd = () => {
    if (scrollViewRef.current) {
      const index = Math.round(scrollOffset / itemHeight);
      const y = index * itemHeight;
      if (y + containerHeight >= scrollViewRef.current?.scrollContentHeight) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      } else {
        scrollViewRef.current.scrollTo({ y, animated: true });
      }
    }
  };

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    setContainerHeight(event.nativeEvent.layout.height);
  };

  return (
    <View style={styles.container} onLayout={handleContainerLayout}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        contentContainerStyle={{
          paddingTop,
          paddingBottom,
        }}
      >
        {items.map((item, index) => (
          <View
            key={item}
            style={{
              height: itemHeight,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={[
                styles.itemText,
                {
                  textAlign: 'center',
                  opacity: selectedItem === item ? 1 : 0.5,
                },
              ]}
            >
              {item}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default MyPicker;
