/* eslint react/no-unused-prop-types: "warn" */
/* eslint-disable react/destructuring-assignment */
import React, { useRef } from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, View,
} from 'react-native';

type ScrollPickerProps = {
  style: any,
  dataSource?: any[],
  selectedIndex: number,
  onValueChange: () => void,
  renderItem: () => void,
  highlightColor?: string,
  itemHeight?: number,
  wrapperBackground?: string,
  wrapperWidth?: number,
  wrapperHeight?: number,
  highlightWidth?: number,
  highlightBorderWidth?: number,
  itemTextStyle?: any,
  activeItemTextStyle?: any,
  onMomentumScrollEnd?: () => void,
  onScrollEndDrag?: () => void,
}

export default function ScrollPicker(props : ScrollPickerProps) {
  return (
    <View style={{
      flex: 1,
      overflow: 'hidden',
      alignSelf: 'center',
      height: props.wrapperHeight,
      width: props.wrapperWidth,
      backgroundColor: props.wrapperBackground,
    }}
    />
  );
}

ScrollPicker.defaultProps = {
  dataSource: [1, 2, 3],
  itemHeight: 60,
  wrapperBackground: '#FFFFFF',
  wrapperHeight: 180,
  wrapperWidth: 150,
  highlightWidth: Dimensions.get('window').width,
  highlightBorderWidth: 2,
  highlightColor: '#333',
  onMomentumScrollEnd: () => {
  },
  onScrollEndDrag: () => {
  },
  itemTextStyle: {
    fontSize: 20, lineHeight: 26, textAlign: 'center', color: '#B4B4B4',
  },
  activeItemTextStyle: {
    fontSize: 20, lineHeight: 26, textAlign: 'center', color: '#222121',
  },
};
