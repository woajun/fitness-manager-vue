import React, { useState, useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, View } from "react-native";

export default function ScrollPicker() {
    const [currentMinute, setCurrentMinute] = useState(0);
    const refMinute = useRef(null);

    function onScroll(e: any) {
        console.log(e);
    }
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={onScroll}
        >
            <View><Text>aaa1</Text></View>
            <View><Text>aaa2</Text></View>
            <View><Text>aaa3</Text></View>
            <View><Text>aaa4</Text></View>
            <View><Text>aaa5</Text></View>
            <View><Text>aaa6</Text></View>
            <View><Text>aaa7</Text></View>
            <View><Text>aaa</Text></View>
            <View><Text>aaa</Text></View>
            <View><Text>aaa</Text></View>
            <View><Text>aaa</Text></View>
            <View><Text>aaa</Text></View>
            <View><Text>aaa</Text></View>
            <View><Text>aaa</Text></View>
            <View><Text>aaa</Text></View>
            <View><Text>aaa</Text></View>
            <View><Text>aaa</Text></View>
            <View><Text>aaa</Text></View>
            <View><Text>aaa</Text></View>
        </ScrollView>
    )
}