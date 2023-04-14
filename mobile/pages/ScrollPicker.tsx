import React, { useRef } from 'react';
import {
  LayoutChangeEvent,
  NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, View,
} from 'react-native';

type ScrollPickerProps = {
  items: string[]
}

export default function ScrollPicker({ items } : ScrollPickerProps) {
  const sview = useRef<ScrollView>(null);
  const itemH = useRef(0);

  function scrollFix(e: NativeSyntheticEvent<NativeScrollEvent>) {
    let verticalY = 0;
    if (e.nativeEvent.contentOffset) {
      verticalY = e.nativeEvent.contentOffset.y;
    }
    console.log(verticalY);
    console.log(itemH.current);
    // sview.current?.scrollTo({ y: 0 });
  }

  function onMomentumScrollEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    scrollFix(e);
  }

  function setHeight(e: LayoutChangeEvent) {
    const { height } = e.nativeEvent.layout;
    if (itemH.current === 0) {
      itemH.current = height;
    }
  }
  return (
    <ScrollView
      ref={sview}
      showsVerticalScrollIndicator={false}
      onScroll={(e) => onMomentumScrollEnd(e)}
      onScrollEndDrag={(e) => onMomentumScrollEnd(e)}
    >
      {
        items.map((item) => (
          <View onLayout={setHeight} key={item}>
            <Text>{ item }</Text>
          </View>
        ))
      }
    </ScrollView>
  );
}
