import React, { useRef } from 'react';
import {
  NativeScrollEvent, NativeSyntheticEvent, Platform, ScrollView, Text, View,
} from 'react-native';

export default function ScrollPicker() {
  const sview = useRef<ScrollView>(null);

  function scrollFix(e: NativeSyntheticEvent<NativeScrollEvent>) {
    let verticalY = 0;
    if (e.nativeEvent.contentOffset) {
      verticalY = e.nativeEvent.contentOffset.y;
    }
    console.log(verticalY);
    sview.current?.scrollTo({ y: 15 });
  }

  function onMomentumScrollEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    scrollFix(e);
  }
  return (
    <ScrollView
      ref={sview}
      showsVerticalScrollIndicator={false}
      onScroll={(e) => onMomentumScrollEnd(e)}
      onMomentumScrollEnd={(e) => onMomentumScrollEnd(e)}
    >
      <View><Text>00</Text></View>
      <View><Text>10</Text></View>
      <View><Text>20</Text></View>
      <View><Text>30</Text></View>
      <View><Text>40</Text></View>
      <View><Text>50</Text></View>
    </ScrollView>
  );
}
