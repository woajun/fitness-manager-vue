import React from 'react';
import { ScrollView } from 'react-native';
import Apple from './pages/timer/Apple';
import Timer from './pages/timer/Timer';
import PreviewLayout from './pages/PreviewLayout';

export default function App() {
  return (
    <ScrollView>
      <Apple />
      <Timer />
      <PreviewLayout />
    </ScrollView>
  );
}
