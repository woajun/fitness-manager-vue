/* eslint-disable react/require-default-props */
/* eslint react/no-unused-prop-types: "warn" */
/* eslint-disable react/destructuring-assignment */
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  NativeScrollEvent, NativeSyntheticEvent, Platform, ScrollView, Text, View,
} from 'react-native';

type ContainerProps = {
  wrapperHeight: number,
  wrapperWidth: number,
  wrapperBackground: string,
  children: any,
}

type ScrollPickerProps = Partial<ContainerProps> & {
  style: any,
  dataSource?: any[],
  selectedIndex: number,
  onValueChange: () => void,
  renderItem: () => void,
  highlightColor?: string,
  itemHeight?: number,
  highlightWidth?: number,
  highlightBorderWidth?: number,
  itemTextStyle?: any,
  activeItemTextStyle?: any,
  onMomentumScrollEnd?: () => void,
  onScrollEndDrag?: () => void,
}

function Container(props: ContainerProps) {
  return (
    <View style={{
      flex: 1,
      overflow: 'hidden',
      alignSelf: 'center',
      height: props.wrapperHeight,
      backgroundColor: props.wrapperBackground,
    }}
    >
      {props.children}
    </View>
  );
}

function SelectedItem({ children, itemHeight }: {children: any, itemHeight: number}) {
  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      height: itemHeight,
    }}
    >
      {children}
    </View>
  );
}
export default function ScrollPicker({
  wrapperHeight = 180,
  wrapperWidth = 150,
  wrapperBackground = '#FFFFFF',
  dataSource = ['00', '10', '20', '30', '40', '50'],
  itemTextStyle = {
    fontSize: 20, lineHeight: 26, textAlign: 'center', color: '#B4B4B4',
  },
  activeItemTextStyle = {
    fontSize: 20, lineHeight: 26, textAlign: 'center', color: '#222121',
  },
  itemHeight = 30,
} : ScrollPickerProps) {
  const sview = useRef<ScrollView | null>(null);
  const momentumStarted = useRef(false);
  const timer = useRef(0);
  const isScrollTo = useRef(false);
  const dragStarted = useRef(false);
  const [selectedIndex, setSelectedIndex] = useState(1);

  function onMomentumScrollBegin() {
    momentumStarted.current = true;
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }

  function scrollFix(e:NativeSyntheticEvent<NativeScrollEvent>) {
    let verticalY = 0;
    const h = itemHeight;
    if (e.nativeEvent.contentOffset) {
      verticalY = e.nativeEvent.contentOffset.y;
    }
    const aSltIdx = Math.round(verticalY / h);
    const verticalElem = aSltIdx * h;
    if (verticalElem !== verticalY) {
      if (Platform.OS === 'ios') {
        isScrollTo.current = true;
      }
      if (sview.current) {
        sview.current.scrollTo({ y: verticalElem });
      }
    }
    if (selectedIndex === aSltIdx) {
      return;
    }
    setSelectedIndex(aSltIdx);
  }

  function onMomentumScrollEnd(e:NativeSyntheticEvent<NativeScrollEvent>) {
    momentumStarted.current = false;
    if (!isScrollTo.current && !momentumStarted.current && !dragStarted.current) {
      scrollFix(e);
    }
  }

  return (
    <Container
      wrapperHeight={wrapperHeight}
      wrapperWidth={wrapperWidth}
      wrapperBackground={wrapperBackground}
    >
      <ScrollView
        ref={sview}
        bounces={false}
        showsVerticalScrollIndicator={false}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
      >
        {dataSource.map((d, i) => {
          const isSelected = i === selectedIndex;
          const item = <Text style={isSelected ? activeItemTextStyle : itemTextStyle}>{d}</Text>;
          return (
            <SelectedItem itemHeight={itemHeight} key={d}>
              {item}
            </SelectedItem>
          );
        })}
      </ScrollView>
    </Container>
  );
}

ScrollPicker.defaultProps = {
  highlightWidth: Dimensions.get('window').width,
  highlightBorderWidth: 2,
  highlightColor: '#333',
  onMomentumScrollEnd: () => {
  },
  onScrollEndDrag: () => {
  },
};
